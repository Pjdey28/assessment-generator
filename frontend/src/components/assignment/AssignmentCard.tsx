import {
  MoreVertical,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { api } from "@/services/api"
import toast from "react-hot-toast"
export default function AssignmentCard({
  assignment,
  
}: any) {
    const handleDelete =
  async () => {
    try {
      await api.delete(
        `/assignments/${assignment._id}`
      )

      toast.success(
        "Assignment Deleted"
      )

      window.location.reload()
    } catch {
      toast.error(
        "Delete Failed"
      )
    }
  }
  const handleRegenerate =
  async () => {
    try {
      await api.post(
        `/assignments/regenerate/${assignment._id}`
      )

      toast.success(
        "Regeneration Started"
      )
    } catch {
      toast.error(
        "Failed"
      )
    }
  }
  return (
   <DropdownMenu>
  
  <DropdownMenuTrigger>
    <MoreVertical />
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    
    <Link
      href={`/assignments/${assignment._id}`}
    >
      <DropdownMenuItem>
        View Assignment
      </DropdownMenuItem>
    </Link>

    <DropdownMenuItem
      onClick={handleRegenerate}
    >
      Regenerate
    </DropdownMenuItem>

    <DropdownMenuItem
      className="text-red-500"
      onClick={handleDelete}
    >
      Delete
    </DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>
  )
}