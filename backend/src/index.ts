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

// Use the `cors` package to handle CORS and preflight properly
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like server-to-server or CURL)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error("Not allowed by CORS"))
    },
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

// Debug route to echo request headers and CORS info
app.get("/api/debug", (req, res) => {
  res.json({
    headers: req.headers,
    allowedOrigins,
    frontendEnv: process.env.FRONTEND_URL || null,
  })
})

const PORT =
  process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  )
})