import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()

  if (session) {
    return redirect('/')
  }

  return (
    <main className='auth-container'>
      <section className='auth-form'>
        <div className='auth-box'>
          <div className='flex flex-row gap-3 items-center'>
            <Image src={'/assets/book.svg'} alt='Book' width={40} height={40} />
            <h1 className='text-2xl font-semibold text-yellow-300'>
              Bookshelf
            </h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className='auth-illustration'>
        <Image
          src={'/assets/illus2.jpg'}
          alt='Reading'
          width={1000}
          height={1000}
          className='size-full object-cover'
        />
      </section>
    </main>
  )
}

export default Layout
