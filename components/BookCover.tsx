import { cn } from '@/lib/utils'
import Image from 'next/image'
import BookCoverSvg from './BookCoverSvg'

type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide'

const varianstStyles: Record<BookCoverVariant, string> = {
  extraSmall: 'book-cover_extra_small',
  small: 'book-cover_small',
  medium: 'book-cover_medium',
  regular: 'book-cover_regular',
  wide: 'book-cover_wide',
}

interface Props {
  variant?: BookCoverVariant
  coverColor: string
  coverImage: string
  className?: string
}

const BookCover = ({
  variant = 'regular',
  coverColor = '#012B48',
  coverImage = 'https://laceholder.co/400x600.png',
  className,
}: Props) => {
  return (
    <div
      className={cn(
        'relative transition-all duration-300',
        varianstStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className='absolute z-10'
        style={{ left: '12%', width: '87.5%', height: '88%' }}
      >
        <Image
          src={coverImage}
          alt='Book Cover'
          fill
          className='rounded-sm object-fill'
        />
      </div>
    </div>
  )
}

export default BookCover
