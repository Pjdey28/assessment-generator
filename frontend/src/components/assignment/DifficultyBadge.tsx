import { Badge } from "@/components/ui/badge"

export default function DifficultyBadge({
  difficulty,
}: any) {
  
  const styles = {
    easy:
      "bg-green-100 text-green-700 border-green-200",

    moderate:
      "bg-yellow-100 text-yellow-700 border-yellow-200",

    hard:
      "bg-red-100 text-red-700 border-red-200",
  }

  return (
    <Badge
      className={`capitalize border ${
        styles[
          difficulty as keyof typeof styles
        ]
      }`}
    >
      {difficulty}
    </Badge>
  )
}