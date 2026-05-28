import { Server } from "socket.io"

let io: Server

export const initSocket = (
  server: any
) => {
  io = new Server(server, {
    cors: {
      origin: [
  "http://localhost:3000",
  process.env
    .FRONTEND_URL as string,
],
      methods: [
        "GET",
        "POST",
      ],
    },
  })

  io.on(
    "connection",
    (socket) => {
      console.log(
        "Socket Connected"
      )

      socket.on(
        "disconnect",
        () => {
          console.log(
            "Socket Disconnected"
          )
        }
      )
    }
  )

  return io
}

export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket not initialized"
    )
  }

  return io
}