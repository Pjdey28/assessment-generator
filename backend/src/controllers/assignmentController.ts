import type { Request } from "express"
import type { Response } from "express"
import Assignment from "../models/Assignment"
import { generationQueue } from "../queues/generationQueue"

import { extractPdfText } from "../utils/extractPdfText"

export const createAssignment =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      let extractedText = ""

      if (req.file) {
        
        if (
          req.file.mimetype ===
          "application/pdf"
        ) {
          extractedText =
            await extractPdfText(
              req.file.buffer
            )
        } else {
          extractedText =
            req.file.buffer.toString()
        }
      }

      const assignment =
        await Assignment.create({
          title:
            req.body.title,

          dueDate:
            req.body.dueDate,

          instructions:
            req.body.instructions,

          questionTypes:
            JSON.parse(
              req.body
                .questionTypes
            ),

          uploadedText:
            extractedText,

          status: "queued",
        })

      await generationQueue.add(
        "generate-assignment",
        {
          assignmentId:
            assignment._id,
        }
      )

      res.status(201).json({
        success: true,
        assignment,
      })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        success: false,
      })
    }
  }
export const getAssignments = async (
  _: Request,
  res: Response
) => {
  const assignments = await Assignment.find().sort({
    createdAt: -1,
  })

  res.json(assignments)
}
export const getAssignmentById =
  async (
    req: Request,
    res: Response
  ) => {
    const assignment =
      await Assignment.findById(
        req.params.id
      )

    res.json(assignment)
  }
export const deleteAssignment =
  async (
    req: Request,
    res: Response
  ) => {
    await Assignment.findByIdAndDelete(
      req.params.id
    )

    res.json({
      success: true,
    })
  }
  export const regenerateAssignment =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const assignment =
        await Assignment.findById(
          req.params.id
        )

      if (!assignment) {
        return res.status(404).json({
          success: false,
        })
      }

      assignment.status =
        "queued"

      assignment.generatedPaper =
        null

      await assignment.save()

      await generationQueue.add(
        "generate-assignment",
        {
          assignmentId:
            assignment._id,
        }
      )

      res.json({
        success: true,
      })
    } catch {
      res.status(500).json({
        success: false,
      })
    }
  }