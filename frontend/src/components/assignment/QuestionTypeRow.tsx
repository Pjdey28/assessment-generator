"use client"

import { Minus, Plus, X } from "lucide-react"

interface Props {
  row: any
  onChange: (
    id: string,
    field: string,
    value: any
  ) => void
  onRemove: (id: string) => void
}

const questionOptions = [
  "Multiple Choice Questions",
  "Short Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "Long Questions",
]

export default function QuestionTypeRow({
  row,
  onChange,
  onRemove,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#F7F7F7] rounded-2xl p-4">
      
      <div className="md:col-span-6">
        <select
          value={row.type}
          onChange={(e) =>
            onChange(
              row.id,
              "type",
              e.target.value
            )
          }
          className="w-full bg-white border rounded-xl px-4 py-3 outline-none"
        >
          {questionOptions.map((q) => (
            <option key={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <div className="flex items-center justify-between bg-white border rounded-full px-3 py-2">
          
          <button
            type="button"
            onClick={() =>
              onChange(
                row.id,
                "count",
                Math.max(
                  1,
                  row.count - 1
                )
              )
            }
          >
            <Minus size={16} />
          </button>

          <span>{row.count}</span>

          <button
            type="button"
            onClick={() =>
              onChange(
                row.id,
                "count",
                row.count + 1
              )
            }
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="flex items-center justify-between bg-white border rounded-full px-3 py-2">
          
          <button
            type="button"
            onClick={() =>
              onChange(
                row.id,
                "marks",
                Math.max(
                  1,
                  row.marks - 1
                )
              )
            }
          >
            <Minus size={16} />
          </button>

          <span>{row.marks}</span>

          <button
            type="button"
            onClick={() =>
              onChange(
                row.id,
                "marks",
                row.marks + 1
              )
            }
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="md:col-span-2 flex justify-end">
        <button
          type="button"
          onClick={() =>
            onRemove(row.id)
          }
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}