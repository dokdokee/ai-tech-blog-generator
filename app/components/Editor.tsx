"use client";

import { useEffect, useState } from "react";
import Prism from "prismjs";
import { marked } from "marked";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";

export default function Editor({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) {
  const [html, setHtml] = useState<string>("");

  // ✅ marked가 string | Promise<string>을 반환할 수 있으니 await로 string 보장
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const parsed = await marked.parse(content || "");
        if (!cancelled) setHtml(parsed);
      } catch {
        // 파싱 실패 시 안전하게 빈 문자열
        if (!cancelled) setHtml("");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [content]);

  // ✅ HTML이 업데이트된 뒤 하이라이팅이 적용되도록 html을 의존성으로
  useEffect(() => {
    Prism.highlightAll();
  }, [html]);

  return (
    // ✅ 모바일 반응형: 작은 화면은 1열, md 이상은 2열
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* ✍️ 입력 영역 */}
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-900 text-white p-4 rounded-lg min-h-[320px] md:min-h-[500px]"
      />

      {/* 👀 미리보기 */}
      <div
        className="prose prose-invert max-w-none bg-gray-950 p-4 rounded-lg overflow-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}