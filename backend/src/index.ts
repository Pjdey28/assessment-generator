import 'dotenv/config'
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import http from "http"
import assignmentRoutes from "./routes/assignmentRoutes"
import "./workers/generationWorker"
import { initSocket } from "./websocket/socket"


const app = express()

const server =
  http.createServer(app)

initSocket(server)

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env
        .FRONTEND_URL as string,
    ],

    credentials: true,
  })
)

app.use(express.json())

mongoose
  .connect(
    process.env
      .MONGO_URI as string
  )
  .then(() => {
    console.log(
      "Mongo Connected"
    )
  })

app.use(
  "/api/assignments",
  assignmentRoutes
)

app.get("/", (_, res) => {
  res.send("API Running")
})

const PORT =
  process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  )
})