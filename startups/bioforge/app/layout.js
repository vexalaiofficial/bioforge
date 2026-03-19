export const metadata = {
  title: 'BioForge - Your Link in Bio, Forged in Fire',
  description: 'The most customizable link in bio platform. 50+ themes, analytics, custom domains.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}