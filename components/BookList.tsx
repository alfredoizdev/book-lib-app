import { IBook } from '@/interfaces/book'
import BookCard from './BookCard'

interface Props {
  books: IBook[]
  title: string
  containerClassName?: string
}

const BookList = ({ books, title, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className='font-BebasNeue text-4xl'>{title}</h2>

      <ul className='book-list'>
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  )
}

export default BookList
