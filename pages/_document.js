import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{
        background: '#fafafa',
        padding: 0,
        margin: 0,
      }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
