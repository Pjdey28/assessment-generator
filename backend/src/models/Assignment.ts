import mongoose from "mongoose"

const AssignmentSchema = new mongoose.Schema(
  {
    title: String,

    dueDate: String,

    instructions: String,
    uploadedText: String,
    questionTypes: [
      {
        type: {
          type: String,
        },

        count: Number,

        marks: Number,
      },
    ],

    status: {
      type: String,
      default: "queued",
    },

    generatedPaper: Object,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model(
  "Assignment",
  AssignmentSchema
)