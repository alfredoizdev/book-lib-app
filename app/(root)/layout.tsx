import { auth } from '@/auth'
import Header from '@/components/Header'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()

  if (!session) {
    return redirect('/sign-in')
  }

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
