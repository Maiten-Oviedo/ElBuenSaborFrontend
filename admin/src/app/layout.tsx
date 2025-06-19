import { montserrat } from '../common/lib/fonts'
import './globals.css'

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        {modal}
        {children}
      </body>
    </html>
  )
}
