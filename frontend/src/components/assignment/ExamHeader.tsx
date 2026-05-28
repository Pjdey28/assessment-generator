export default function ExamHeader({
  assignment,
}: any) {
  return (
    <div className="border-b pb-8 mb-10">
      
      <div className="text-center">
        
        <h1 className="text-4xl font-bold">
          Delhi Public School
        </h1>

        <p className="mt-3 text-lg">
          {
            assignment.generatedPaper
              ?.subject
          }
        </p>

        <p className="text-gray-500">
          Class:
          {" "}
          {
            assignment.generatedPaper
              ?.class
          }
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-8 text-lg gap-3">
        <div>
          <span className="font-medium mr-2">Duration:</span>
          {assignment.generatedPaper?.duration}
        </div>

        <div>
          <span className="font-medium mr-2">Total Marks:</span>
          {assignment.generatedPaper?.totalMarks}
        </div>
      </div>
    </div>
  )
}