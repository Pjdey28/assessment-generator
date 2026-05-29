// Use dynamic import to handle CJS/ESM export shapes across environments
export const extractPdfText = async (buffer: Buffer) => {
  const pdfParseModule = await import("pdf-parse")
  const pdfParse = (pdfParseModule && (pdfParseModule as any).default) || (pdfParseModule as any)

  if (typeof pdfParse !== "function") {
    throw new Error("pdf-parse module did not export a function")
  }

  const data = await (pdfParse as any)(buffer)
  return data?.text || ""
}