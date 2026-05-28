"use client"

import { useDropzone } from "react-dropzone"

import {
  UploadCloud,
  FileText,
} from "lucide-react"

interface Props {
  file: File | null
  setFile: (
    file: File | null
  ) => void
}

export default function FileUpload({
  file,
  setFile,
}: Props) {
  
  const { getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "application/pdf":
          [".pdf"],
        "text/plain": [
          ".txt",
        ],
      },

      maxFiles: 1,

      onDrop: (
        acceptedFiles
      ) => {
        setFile(
          acceptedFiles[0]
        )
      },
    })

  return (
    <div>
      
      <label className="font-medium">
        Upload Study Material
      </label>

      <div
        {...getRootProps()}
        className="mt-3 border-2 border-dashed rounded-[28px] bg-[#F8F8F8] p-6 sm:p-8 md:p-10 text-center cursor-pointer hover:border-black transition"
      >
        <input
          {...getInputProps()}
        />

        <UploadCloud
          className="mx-auto mb-4"
          size={40}
        />

        <h3 className="font-semibold text-lg">
          Drag & Drop Files
        </h3>

        <p className="text-gray-500 mt-2">
          Upload PDF or TXT
        </p>

        {file && (
          <div className="mt-6 flex items-center justify-center gap-3 bg-white rounded-2xl p-4 border">
            
            <FileText
              size={20}
            />

            <span>
              {file.name}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}