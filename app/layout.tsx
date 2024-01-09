import '@/styles/globals.css'

export const metadata = {
  title: 'Minesweeper',
  description: '지뢰찾기',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
