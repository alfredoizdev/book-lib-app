import { serve } from '@upstash/workflow/nextjs'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { sendEmail } from '@/lib/workflow'

type UserState = 'non-active' | 'active'

type InitialData = {
  email: string
  fullName: string
}

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS

const getUserState = async (email: string): Promise<UserState> => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (user.length === 0) return 'non-active'

    const lastActivityDate = new Date(user[0].lastActivityDate!)
    const now = new Date()
    const timeDifference = now.getTime() - lastActivityDate.getTime()

    if (
      timeDifference > THREE_DAYS_IN_MS &&
      timeDifference <= THIRTY_DAYS_IN_MS
    ) {
      return 'non-active'
    }

    return 'active'
  } catch (error) {
    console.error('Error fetching user state:', error)
    throw new Error('Failed to fetch user state')
  }
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  try {
    // Welcome Email
    await context.run('new-signup', async () => {
      try {
        await sendEmail({
          email,
          subject: 'Welcome to the platform',
          message: `Welcome ${fullName}!`,
        })
      } catch (error) {
        console.error('Error sending welcome email:', error)
        throw new Error('Failed to send welcome email')
      }
    })

    await context.sleep('wait-for-3-days', 60 * 60 * 24 * 3)

    while (true) {
      try {
        const state = await context.run('check-user-state', async () => {
          return await getUserState(email)
        })

        if (state === 'non-active') {
          await context.run('send-email-non-active', async () => {
            try {
              await sendEmail({
                email,
                subject: 'Are you still there?',
                message: `Hey ${fullName}, we miss you!`,
              })
            } catch (error) {
              console.error('Error sending non-active email:', error)
              throw new Error('Failed to send non-active email')
            }
          })
        } else if (state === 'active') {
          await context.run('send-email-active', async () => {
            try {
              await sendEmail({
                email,
                subject: 'Welcome back!',
                message: `Welcome back ${fullName}!`,
              })
            } catch (error) {
              console.error('Error sending active email:', error)
              throw new Error('Failed to send active email')
            }
          })
        }

        await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30)
      } catch (error) {
        console.error('Error in user state workflow:', error)
        throw new Error('Failed in user state workflow')
      }
    }
  } catch (error) {
    console.error('Error in onboarding workflow:', error)
    throw new Error('Failed in onboarding workflow')
  }
})
