import { IBook } from '@/interfaces/book'
import { Book, Star } from 'lucide-react'
import { Button } from './ui/button'
import BookCover from './BookCover'

const BookOverView = ({
  author,
  title,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
}: IBook) => {
  return (
    <section className='book-overview'>
      <div className='flex flex-1 flex-col gap-5'>
        <h1>{title}</h1>

        <div className='book-info'>
          <p>
            by <span className='font-semibold'>{author}</span>
          </p>
          <p>
            Category <span className='font-semibold'>{genre}</span>
          </p>
        </div>
        <div className='flex flex-row gap-1 text-gray-300'>
          <Star />
          <p>{rating}</p>
        </div>
        <div className='book-copies'>
          <p>
            Total Books: <span>{total_copies}</span>
          </p>
          <p>
            Avaliable Book: <span>{available_copies}</span>
          </p>
          <p className='book-description'>{description}</p>
        </div>
        <Button
          variant='default'
          className='font-BebasNeue book-overview_btn text-gray-950 text-xl'
        >
          <Book />
          Borrow
        </Button>
      </div>
      <div className='relative flex flex-1 justify-center'>
        <div className='relative'>
          <BookCover
            variant='wide'
            className='z-10'
            coverColor={color}
            coverImage={cover}
          />
          <div className='absolute left-16 top-10 rotate-12 opacity-40'>
            <BookCover variant='wide' coverColor={color} coverImage={cover} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookOverView
