const pdfParse = require("pdf-parse")

export const extractPdfText = async (buffer: Buffer) => {
  const data = await pdfParse(buffer)
  return data.text
}