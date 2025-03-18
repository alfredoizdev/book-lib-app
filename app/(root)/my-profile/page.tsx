import { signOut } from '@/auth'
import BookList from '@/components/BookList'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'

const MyProfilePage = () => {
  return (
    <>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <Button type='submit' className='text-gray-950'>
          Logout
        </Button>
      </form>
      <div className='mt-10'>
        <BookList title='Borrowed Books' books={sampleBooks} />
      </div>
    </>
  )
}

export default MyProfilePage
