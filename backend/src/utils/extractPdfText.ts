// Use dynamic import to handle CJS/ESM export shapes across environments
export const extractPdfText = async (buffer: Buffer) => {
  // Try pdf-parse first (convenient API)
  try {
    const pdfParseModule = await import("pdf-parse")
    const pdfParse = (pdfParseModule && (pdfParseModule as any).default) || (pdfParseModule as any)

    if (typeof pdfParse === "function") {
      try {
        const data = await (pdfParse as any)(buffer)
        if (data?.text) return data.text
      } catch (err) {
        console.warn("pdf-parse threw while parsing; will try fallback", err)
      }
    } else {
      console.warn("pdf-parse module did not export a function; will try fallback. module=", Object.keys(pdfParseModule || {}))
    }
  } catch (err) {
    console.warn("Error loading pdf-parse; will try fallback.", err)
  }

  // Fallback: use pdfjs-dist (works in many Node environments)
  try {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf")
    const pdfjsLib = (pdfjs && (pdfjs as any).default) || pdfjs

    // pdfjs expects a typed array for data
    const uint8 = new Uint8Array(buffer)
    const loadingTask = (pdfjsLib as any).getDocument({ data: uint8 })
    const pdf = await loadingTask.promise

    let fullText = ""
    for (let i = 1; i <= (pdf as any).numPages; i++) {
      try {
        const page = await (pdf as any).getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items.map((itm: any) => itm.str || "").join(" ")
        fullText += pageText + "\n"
      } catch (pageErr) {
        console.warn(`Failed to extract page ${i}`, pageErr)
      }
    }

    return fullText
  } catch (err) {
    console.warn("pdfjs fallback failed; skipping PDF extraction.", err)
  }

  // If all parsing fails, return empty string so callers don't get a 500
  return ""
}