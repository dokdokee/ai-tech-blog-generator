]"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function Editor({
  content,
  onChange,
}: {
  content: string;
  onChange: (v: string) => void;
}) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const md = useMemo(() => content ?? "", [content]);

  return (
    <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-black/30 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
        <button
          onClick={() => setTab("edit")}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            tab === "edit" ? "bg-cyan-500 text-white" : "bg-white/10 text-gray-200"
          }`}
        >
          편집
        </button>
        <button
          onClick={() => setTab("preview")}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            tab === "preview" ? "bg-cyan-500 text-white" : "bg-white/10 text-gray-200"
          }`}
        >
          미리보기
        </button>

        <div className="ml-auto text-xs text-gray-400">
          Markdown 편집 + 코드 하이라이팅 프리뷰
        </div>
      </div>

      <div className="p-3">
        {tab === "edit" ? (
          <div data-color-mode="dark">
            <MDEditor value={md} onChange={(v) => onChange(v ?? "")} height={320} />
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]}>
              {md}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}