export const parsePaper = (
  raw: string
) => {
  try {
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    return JSON.parse(cleaned)
  } catch (error) {
    console.log(error)

    throw new Error(
      "Invalid AI Response"
    )
  }
}