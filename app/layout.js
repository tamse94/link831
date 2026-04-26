export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <title>Redirect System</title>
      </head>
      <body style={{ margin: 0, backgroundColor: '#f0f0f0' }}>
        {children}
      </body>
    </html>
  );
}
