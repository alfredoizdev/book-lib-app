import BookList from '@/components/BookList'
import BookOverView from '@/components/BookOverView'
import { sampleBooks } from '@/constants'
// import { db } from '@/database/drizzle'
// import { users } from '@/database/schema'

const Home = async () => {
  // const response = await db.select().from(users)
  // console.log(JSON.stringify(response, null, 2))

  return (
    <>
      <BookOverView {...sampleBooks[0]} />
      <BookList
        title={'Lated Books'}
        books={sampleBooks}
        containerClassName={'mt-28'}
      />
    </>
  )
}

export default Home
