import '../styles/globals.sass'

export const metadata = {
  title: 'Blockly Maze Demo',
  description: 'Blockly Maze Demo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
