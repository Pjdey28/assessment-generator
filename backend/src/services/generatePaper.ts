import { groq } from "../config/groq"

export const generatePaper = async (
  prompt: string
) => {
  const response =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
    })

  return response.choices[0]?.message?.content ?? ""
}