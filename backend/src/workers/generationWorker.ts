import { Worker, type ConnectionOptions } from "bullmq"
import { redisConnection } from "../config/redis"
import { getIO } from "../websocket/socket"
import Assignment from "../models/Assignment"
import { buildPrompt } from "../prompts/buildPrompt"
import { generatePaper } from "../services/generatePaper"
import { parsePaper } from "../parsers/parsePaper"

new Worker(
  "assignment-generation",

  async (job) => {
    try {
      const { assignmentId } = job.data

      const assignment =
        await Assignment.findById(
          assignmentId
        )

      if (!assignment) return

      assignment.status = "processing"
      getIO().emit(
        "assignment-update",
        {
            assignmentId,
            status: "processing",
        }
      )
      await assignment.save()
      getIO().emit(
        "assignment-update",
        {
            assignmentId,
            status: "completed",
            assignment,
        }
      )
      const prompt =
        buildPrompt(assignment)

      const raw =
        await generatePaper(prompt)

      const parsed =
        parsePaper(raw as string)

      assignment.generatedPaper =
        parsed

      assignment.status =
        "completed"

      await assignment.save()

      console.log(
        "Assignment Generated"
      )
    } catch (error) {
      console.log(error)
    }
  },

  {
    connection: redisConnection as unknown as ConnectionOptions,
  }
)