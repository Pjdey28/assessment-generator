// pdf-parse may export the parser as the module itself or as the default property
const pdfParseModule = require("pdf-parse")
const pdfParse = typeof pdfParseModule === "function" ? pdfParseModule : pdfParseModule.default

export const extractPdfText = async (buffer: Buffer) => {
  const data = await pdfParse(buffer)
  return data.text
}