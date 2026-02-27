"use client"

import { useEffect, useState } from "react"
import Prism from "prismjs"
import { marked } from "marked"

import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-bash"

export default function Editor({
  content,
  onChange,
}: {
  content: string
  onChange: (value: string) => void
}) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    const parsed = marked(content || "")
    setHtml(parsed)
  }, [content])

  useEffect(() => {
    Prism.highlightAll()
  }, [content])

  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      {/* ✍️ 입력 영역 */}
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-900 text-white p-4 rounded-lg min-h-[500px]"
      />

      {/* 👀 미리보기 */}
      <div
        className="prose prose-invert max-w-none bg-gray-950 p-4 rounded-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
