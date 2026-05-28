"use client"

import {
  Home,
  Users,
  BookOpen,
  Library,
  Settings,
} from "lucide-react"

import Link from "next/link"

const items = [
  {
    label: "Home",
    icon: Home,
  },
  {
    label: "My Groups",
    icon: Users,
  },
  {
    label: "Assignments",
    icon: BookOpen,
  },
  {
    label: "My Library",
    icon: Library,
  },
]

export default function Sidebar() {
  return (
    <div className="hidden md:block w-[280px] bg-white min-h-screen p-6 border-r">
      <div>
        <div className="text-2xl font-bold mb-8">
          VedaAI
        </div>
        <Link href='/assignments/create'>
          <button className="w-full bg-black text-white rounded-full py-3 mb-8">
            + Create Assignment
          </button>
        </Link>

        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 cursor-pointer"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border rounded-2xl p-4">
        <div className="font-medium">
          Delhi Public School
        </div>

        <div className="text-sm text-gray-500">
          Bokaro Steel City
        </div>
      </div>
    </div>
  )
}