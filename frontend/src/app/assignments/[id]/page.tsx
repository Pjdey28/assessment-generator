"use client"

import { useEffect } from "react"
import { useState } from "react"
import { api } from "@/services/api"
import Sidebar from "@/components/dashboard/Sidebar"
import Navbar from "@/components/dashboard/Navbar"
import DifficultyBadge from "@/components/assignment/DifficultyBadge"
import ExamHeader from "@/components/assignment/ExamHeader"
import StudentInfo from "@/components/assignment/StudentInfo"
import AnswerKey from "@/components/assignment/AnswerKey"
import {
  Badge,
} from "@/components/ui/badge"
import MobileNavbar from "@/components/dashboard/MobileNavbar"
export default function AssignmentPage({
  params,
}: any) {
  
  const [assignment, setAssignment] =
    useState<any>(null)

  const fetchAssignment =
    async () => {
      const res =
        await api.get(
          `/assignments/${params.id}`
        )

      setAssignment(
        res.data
      )
    }

  useEffect(() => {
    fetchAssignment()
  }, [])

  if (!assignment)
    return (
      <div>
        Loading...
      </div>
    )

  return (
    <div className="flex bg-[#F5F5F5] min-h-screen">
      
      <Sidebar />

      <div className="flex-1 flex-col md:flex-row">
        
        <Navbar />

        <div className="p-8">
          
          <div className="bg-white rounded-[32px] p-10">
            
            <div className="bg-black text-white rounded-3xl p-8 mb-8">
              
              <h1 className="text-2xl font-bold">
                Generated Assignment
              </h1>

              <button className="mt-4 bg-white text-black px-5 py-3 rounded-full">
                Download PDF
              </button>
            </div>

            <div 
    id="assignment-paper"
    className="max-w-5xl mx-auto bg-white rounded-[32px] p-5 md:p-12 shadow-sm">
  
  <ExamHeader
    assignment={assignment}
  />

  <StudentInfo />

  {assignment.generatedPaper?.sections?.map(
    (
      section: any,
      index: number
    ) => (
      <div
        key={index}
        className="mb-16"
      >
        
        <div className="mb-8">
          
          <h2 className="text-3xl font-bold">
            {section.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {
              section.instruction
            }
          </p>
        </div>

        <div className="space-y-10">
          
          {section.questions.map(
            (
              q: any,
              i: number
            ) => (
              <div
                key={i}
                className="border-b pb-8"
              >
                
                <div className=" flex flex-col md:flex-row gap-5 md:justify-between">
                  
                  <div className="text-lg leading-9">
                    <span className="font-semibold">
                      {i + 1}.
                    </span>
                    {" "}
                    {q.question}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    
                    <DifficultyBadge
                      difficulty={
                        q.difficulty
                      }
                    />

                    <div className="border rounded-full px-4 py-1 text-sm">
                      {q.marks}
                      {" "}
                      Marks
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    )
  )}

  <AnswerKey
    sections={
      assignment.generatedPaper
        ?.sections
    }
  />
</div>
        </div>
      </div>
    </div>
    <MobileNavbar />
    </div>
    
  )
}
