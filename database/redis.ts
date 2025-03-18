import config from '@/lib/config'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: config.env.upsthash.redisUrl,
  token: config.env.upsthash.redisToken,
})

export default redis
