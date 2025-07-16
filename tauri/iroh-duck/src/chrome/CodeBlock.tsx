import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"

export default function CodeBlock(props: { language: string; value: string }) {
  const { language, value } = props
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>
}
