"use client"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import Sidebar from "@/components/dashboard/Sidebar"
import Navbar from "@/components/dashboard/Navbar"
import AssignmentCard from "@/components/assignment/AssignmentCard"
import {socket} from "@/websocket/socket"
import { api } from "@/services/api"
import {
  setAssignments,updateAssignmentStatus
} from "@/redux/features/assignmentSlice"
import DashboardToolbar from "@/components/dashboard/DashboardToolbar"
export default function Home() {
  const [search, setSearch] =
  useState("")

const [filter, setFilter] =
  useState("all")
  const dispatch =
    useDispatch()

  const assignments =
    useSelector(
      (state: any) =>
        state.assignment
          .assignments
    )

  const fetchAssignments =
    async () => {
      const res =
        await api.get(
          "/assignments"
        )

      dispatch(
        setAssignments(
          res.data
        )
      )
    }

  useEffect(() => {
  fetchAssignments()

  socket.on(
    "assignment-update",
    (data) => {
      dispatch(
        updateAssignmentStatus(
          data
        )
      )
    }
  )

  return () => {
    socket.off(
      "assignment-update"
    )
  }
}, [])
const filteredAssignments =
  assignments.filter(
    (assignment: any) => {
      
      const matchesSearch =
        assignment.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesFilter =
        filter === "all"
          ? true
          : assignment.status ===
            filter

      return (
        matchesSearch &&
        matchesFilter
      )
    }
  )

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-4 md:p-8">
          <DashboardToolbar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />
          {filteredAssignments.length === 0 ? (
            <div className="bg-white rounded-3xl min-h-[40vh] md:min-h-[60vh] flex flex-col items-center justify-center p-6">
              
              <h1 className="text-3xl font-bold mb-3">
                No assignments yet
              </h1>

              <p className="text-gray-500 mb-6">
                Create your first assignment
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              
              {assignments.map(
                (
                  assignment: any
                ) => (
                  <AssignmentCard
                    key={
                      assignment._id
                    }
                    assignment={
                      assignment
                    }
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}