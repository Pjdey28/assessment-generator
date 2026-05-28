import { Bell } from "lucide-react"

export default function Navbar() {
  return (
    <div className="h-[70px] bg-white border-b flex items-center justify-between px-6">
      <div className="font-medium">
        Assignment
      </div>

      <div className="flex items-center gap-4">
        <Bell size={20} />

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gray-300" />

          <span className="text-sm font-medium">
            John Doe
          </span>
        </div>
      </div>
    </div>
  )
}