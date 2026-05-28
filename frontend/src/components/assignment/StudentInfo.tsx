export default function StudentInfo() {
  return (
    <div className="space-y-6 mb-12">
      
      <div className="flex items-center gap-3">
        <span className="font-medium w-24 md:w-36 flex-shrink-0">
          Name
        </span>

        <div className="border-b flex-1 h-[1px]" />
      </div>

      <div className="flex items-center gap-3">
        <span className="font-medium w-24 md:w-36 flex-shrink-0">
          Roll Number
        </span>

        <div className="border-b flex-1 h-[1px]" />
      </div>

      <div className="flex items-center gap-3">
        <span className="font-medium w-24 md:w-36 flex-shrink-0">
          Section
        </span>

        <div className="border-b flex-1 h-[1px]" />
      </div>
    </div>
  )
}