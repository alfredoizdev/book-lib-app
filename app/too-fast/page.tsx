const TooFastPage = () => {
  return (
    <main className='root-container px-5 xs:px-10 md:px-16 flex min-h-screen flex-col items-center justify-center'>
      <h1 className='font-IbmPlexSans text-5xl font-bold'>
        Whao, slow down there, Speedy!
      </h1>
      <p className='text-center text-gray-100 mt-5 max-w-xl text-base'>
        You&lsquo;re making too many requests. Please wait a moment before
        trying again.
      </p>
    </main>
  )
}

export default TooFastPage
