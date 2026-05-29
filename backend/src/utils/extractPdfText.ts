const pdfParse = require("pdf-parse-fork");

export const extractPdfText = async (buffer: Buffer) => {
  const data = await pdfParse(buffer);
  return data.text;
};