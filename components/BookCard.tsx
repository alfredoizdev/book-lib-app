import { IBook } from '@/interfaces/book'
import Link from 'next/link'
import BookCover from './BookCover'
import { cn, truncateText } from '@/lib/utils'
import { CalendarDays } from 'lucide-react'
import { Button } from './ui/button'

const BookCard = ({
  id,
  title,
  genre,
  color,
  cover,
  isLoanedBook = false,
}: IBook) => {
  return (
    <li className={cn(isLoanedBook && '2xl:w-52 w-full')}>
      <Link
        href={`/book/${id}`}
        className={cn(isLoanedBook && 'w-full flex flex-col items-center')}
      >
        <BookCover coverImage={cover} coverColor={color} />
        <div className={cn('mt-4', isLoanedBook && '2xl:max-w-40 max-w-28')}>
          <p className='book-title text-white'>{truncateText(title, 12)}</p>
          <p className='book-genre'>{genre}</p>
        </div>
        {isLoanedBook && (
          <div className='mt-3 w-full'>
            <div className='book-loaned'>
              <CalendarDays width={18} height={18} color='white' />
              <p className='text-base text-white'> 11 days left to return</p>
            </div>
            <Button className='book-btn text-yellow-300 text-xl bg-black hover:bg-black/80'>
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  )
}

export default BookCard
