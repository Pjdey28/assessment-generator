import { Redis } from "ioredis"

export const redisConnection =
  new Redis({
    host:
      process.env.REDIS_HOST,

    port: Number(
      process.env.REDIS_PORT
    ),

    password:
      process.env.REDIS_PASSWORD,

    tls: {},

    maxRetriesPerRequest:
      null,
  })

redisConnection.on(
  "connect",
  () => {
    console.log(
      "Redis Connected"
    )
  }
)

redisConnection.on(
  "error",
  (err) => {
    console.log(
      "Redis Error:",
      err
    )
  }
)