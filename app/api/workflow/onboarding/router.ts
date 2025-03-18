import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { sendEmail } from '@/lib/workflow'
import { serve } from '@upstash/workflow/nextjs'
import { eq } from 'drizzle-orm'

type UserState = 'non-active' | 'active'

type InitialData = {
  email: string
  fullName: string
}

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS
const THRITY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (user.length === 0) {
    return 'non-active'
  }

  const lastActivityDate = new Date(user[0].lastActivityDate!)
  const now = new Date()
  const timeDifference = now.getTime() - lastActivityDate.getTime()

  if (timeDifference > THREE_DAYS_IN_MS && timeDifference < THRITY_DAYS_IN_MS) {
    return 'non-active'
  }

  return 'active'
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  // welcome email
  await context.run('new-signup', async () => {
    await sendEmail({
      email,
      subject: 'Welcome to library of university',
      message: `Hello ${fullName}, welcome to library dev`,
    })
  })

  await context.sleep('wait-for-3-days', 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run('check-user-state', async () => {
      return await getUserState(email)
    })

    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        await sendEmail({
          email,
          subject: 'Are you still there?',
          message: `Hello ${fullName}, we miss you`,
        })
      })
    } else if (state === 'active') {
      await context.run('send-email-active', async () => {
        await sendEmail({
          email,
          subject: 'Thank you for being active',
          message: `Hello ${fullName}, thank you for being active`,
        })
      })
    }

    await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30)
  }
})

// async function sendEmail(message: string, email: string) {
//   // Implement email sending logic here
//   console.log(`Sending ${message} email to ${email}`)
// }

// type UserState = 'non-active' | 'active'

// const getUserState = async (): Promise<UserState> => {
//   // Implement user state logic here
//   return 'non-active'
// }
