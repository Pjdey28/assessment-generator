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

// Allow requests from local dev and deployed frontend; reflect origin dynamically
const FRONTEND_URL = process.env.FRONTEND_URL || "https://assessment-generator-nine.vercel.app"
const allowedOrigins = ["http://localhost:3000", FRONTEND_URL]

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin)
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  }
  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(204)
  }
  next()
})

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