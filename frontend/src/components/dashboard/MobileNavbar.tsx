"use client"

import Link from "next/link"

import { Menu } from "lucide-react"

export default function MobileNavbar() {
  return (
    <div className="md:hidden flex items-center justify-between p-5 border-b bg-white sticky top-0 z-50">
      
      <h1 className="text-xl font-bold">
        VedaAI
      </h1>

      <Link
        href="/assignments/create"
      >
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm">
          Create
        </button>
      </Link>
    </div>
  )
}