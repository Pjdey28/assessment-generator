import "./globals.css"
import ReduxProvider from "@/redux/provider"
import {Toaster} from "react-hot-toast"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  )
}