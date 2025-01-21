import '../styles/globals.css'

export const metadata = {
  title: 'SQL.js Demo',
  description: 'Next.js SQL interpreter using sql.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 