const config = {
  env: {
    apiEndPoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodApiEndPoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    imageKit: {
      publicKay: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    },
    upsthash: {
      redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstahsUrl: process.env.QSTASH_URL!,
      qstahsToken: process.env.QSTASH_TOKEN!,
    },
    resendToken: process.env.RESEND_TOKEN!,
    databaseUrl: process.env.DATABASE_URL!,
  },
}

export default config
