export const buildPrompt = (
  assignment: any
) => {
  return `
Generate a professional school question paper.

Return ONLY valid JSON.

JSON Schema:
{
  "title":"",
  "subject":"",
  "class":"",
  "duration":"",
  "totalMarks":0,

  "sections":[
    {
      "title":"",
      "instruction":"",

      "questions":[
        {
          "question":"",
          "difficulty":"easy | moderate | hard",
          "marks":0,
          "answer":""
        }
      ]
    }
  ]
}

Rules:
- Group questions into sections
- Add proper marks
- Add concise answer key
- Maintain school exam style
- Return STRICT JSON ONLY

Study Material:
${assignment.uploadedText}

Question Types:
${JSON.stringify(assignment.questionTypes)}

Instructions:
${assignment.instructions}
`
}