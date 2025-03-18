import { auth } from '@/auth'
import Header from '@/components/Header'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { after } from 'next/server'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()

  if (!session) {
    return redirect('/sign-in')
  }

  // update user last activity date once a day
  after(async () => {
    if (!session?.user?.id) return

    // get the user see last activity date is today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1)

    if (user[0]) {
      const lastActivityDate = user[0].lastActivityDate
      if (lastActivityDate === new Date().toISOString().slice(0, 10)) return
    }

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session.user.id))
  })

  return (
    <main className='root-container px-5 xs:px-10 md:px-16'>
      <div className='mx-auto max-w-7xl'>
        <Header session={session} />
        <div className='t-20 pb-20'>{children}</div>
      </div>
    </main>
  )
}

export default Layout
