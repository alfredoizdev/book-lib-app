'use client'
import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Session } from 'next-auth'

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname()

  return (
    <header className='my-10 flex justify-between gap-5'>
      <Link href='/' className='flex items-center text-yellow-300'>
        <Image src='/assets/book.svg' width={20} height={20} alt='Library' />
        Bookshelf
      </Link>
      <ul className='flex items-center flex-row gap-8'>
        <li>
          <Link
            href='/'
            className={cn(
              'text-base cursor-pointer capitalize text-gray-50',
              pathname === '/' ? 'text-yellow-300' : 'text-gray-50'
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href='/library'
            className={cn(
              'text-base cursor-pointer capitalize text-gray-50',
              pathname === '/library' ? 'text-yellow-300' : 'text-gray-50'
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link
            href='/authors'
            className={cn(
              'text-base cursor-pointer capitalize text-gray-50',
              pathname === '/authors' ? 'text-yellow-300' : 'text-gray-50'
            )}
          >
            Authors
          </Link>
        </li>
        {session && (
          <li>
            <Link href={'/my-profile'}>
              <Avatar>
                <AvatarFallback>
                  {getInitials(session?.user?.name || '')}
                </AvatarFallback>
              </Avatar>
            </Link>
          </li>
        )}
      </ul>
    </header>
  )
}

export default Header
