"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuid } from "uuid"
import Sidebar from "@/components/dashboard/Sidebar"
import Navbar from "@/components/dashboard/Navbar"
import QuestionTypeRow from "@/components/assignment/QuestionTypeRow"
import FileUpload from "@/components/assignment/FileUpload"
import { api } from "@/services/api"
import { toast } from "react-hot-toast"
export default function CreateAssignment() {
  
  const {
    register,
    handleSubmit,
  } = useForm()
  const [file, setFile] =
  useState<File | null>(
    null
  )
  const [questionRows, setQuestionRows] =
    useState([
      {
        id: uuid(),
        type:
          "Multiple Choice Questions",
        count: 4,
        marks: 1,
      },
    ])
    const [loading, setLoading] = useState(false)

  const handleRowChange = (
    id: string,
    field: string,
    value: any
  ) => {
    setQuestionRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    )
  }

  const handleRemoveRow = (
    id: string
  ) => {
    setQuestionRows((prev) =>
      prev.filter(
        (row) => row.id !== id
      )
    )
  }

  const addRow = () => {
    setQuestionRows((prev) => [
      ...prev,
      {
        id: uuid(),
        type:
          "Short Questions",
        count: 2,
        marks: 2,
      },
    ])
  }

  const totalQuestions =
    questionRows.reduce(
      (acc, row) =>
        acc + row.count,
      0
    )

  const totalMarks =
    questionRows.reduce(
      (acc, row) =>
        acc +
        row.count * row.marks,
      0
    )

const onSubmit = async (
  data: any
) => {
  setLoading(true)
  const formData =
    new FormData()

  formData.append(
    "title",
    data.title
  )

  formData.append(
    "dueDate",
    data.dueDate
  )

  formData.append(
    "instructions",
    data.instructions
  )

  formData.append(
    "questionTypes",
    JSON.stringify(
      questionRows
    )
  )

  if (file) {
    formData.append(
      "file",
      file
    )
  }

  await api.post(
    "/assignments",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  )

  toast.success(
    "Assignment Created"
  )
  setLoading(false)
}

  return (
    <div className="flex bg-[#F5F5F5] min-h-screen">
      
      <Sidebar />

      <div className="flex-1 flex-col md:flex-row">
        
        <Navbar />

        <div className="p-8">
          
          <div className="bg-white rounded-[32px] p-8">
            
            <div className="mb-8">
              
              <h1 className="text-3xl font-bold">
                Create Assignment
              </h1>

              <p className="text-gray-500 mt-2">
                Create a new assessment
              </p>
            </div>

            <form
              onSubmit={handleSubmit(
                onSubmit
              )}
              className="space-y-8"
            >
              
              <div>
                <label className="font-medium">
                  Assignment Title
                </label>

                <input
                  {...register(
                    "title"
                  )}
                  className="w-full border rounded-2xl p-4 mt-2"
                  placeholder="Enter assignment title"
                />
              </div>
              <FileUpload
                file={file}
                setFile={setFile}
                />

              <div>
                <label className="font-medium">
                  Due Date
                </label>

                <input
                  type="date"
                  {...register(
                    "dueDate"
                  )}
                  className="w-full border rounded-2xl p-4 mt-2"
                />
              </div>

              <div>
                <label className="font-medium">
                  Question Types
                </label>

                <div className="space-y-4 mt-4">
                  
                  {questionRows.map(
                    (row) => (
                      <QuestionTypeRow
                        key={row.id}
                        row={row}
                        onChange={
                          handleRowChange
                        }
                        onRemove={
                          handleRemoveRow
                        }
                      />
                    )
                  )}

                  <button
                    type="button"
                    onClick={addRow}
                    className="border rounded-full px-5 py-3"
                  >
                    + Add Question Type
                  </button>
                </div>
              </div>

              <div>
                <label className="font-medium">
                  Additional Instructions
                </label>

                <textarea
                  {...register(
                    "instructions"
                  )}
                  rows={5}
                  className="w-full border rounded-2xl p-4 mt-2"
                  placeholder="Add instructions for AI generation..."
                />
              </div>

              <div className="flex justify-between items-center border-t pt-6">
                
                <div>
                  <div className="font-medium">
                    Total Questions:
                    {" "}
                    {
                      totalQuestions
                    }
                  </div>

                  <div className="text-gray-500">
                    Total Marks:
                    {" "}
                    {totalMarks}
                  </div>
                </div>

                <button
                    disabled={loading}
                    className="bg-black text-white px-8 py-4 rounded-full"
                    >
                    {loading
                        ? "Generating..."
                        : "Generate Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}