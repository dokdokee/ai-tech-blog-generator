"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";


import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

type StylePreset = "tutorial" | "til" | "troubleshooting" | "deepdive";

function stripMarkdown(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#>*_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


function generateMetaDescription(markdown: string, maxLen = 160) {
  const text = stripMarkdown(markdown);
  if (!text) return "";

  const firstSentence = text.split(/(?<=[.?!])\s+/)[0] ?? text;
  let base = firstSentence.length < 80 ? text.slice(0, 220) : firstSentence;

  base = base.trim();
  if (base.length > maxLen) {
    base = base.slice(0, maxLen - 1).replace(/\s+\S*$/, "");
    base = base + "…";
  }
  return base;
}

function applyStyleTemplate(md: string, preset: StylePreset) {
  const headerByPreset: Record<StylePreset, string> = {
    tutorial:
      `<!-- STYLE:tutorial -->
> 목표: 독자가 따라 할 수 있는 단계별 튜토리얼

## TL;DR
- 

## Prerequisites
- 

## Steps
1. 
2. 

## Verification
- 

## Troubleshooting
- 
`,
    til:
      `<!-- STYLE:til -->
> Today I Learned (TIL)

## 배운 것
- 

## 왜 중요한가
- 

## 예제
\`\`\`
\`\`\`

## 다음에 해볼 것
- 
`,
    troubleshooting:
      `<!-- STYLE:troubleshooting -->
> 문제 해결 기록 (현상 → 원인 → 해결 → 재발 방지)

## 현상(Symptoms)
- 

## 재현 방법(Reproduction)
1. 
2. 

## 원인(Root cause)
- 

## 해결(Fix)
- 

## 재발 방지(Prevention)
- 
`,
    deepdive:
      `<!-- STYLE:deepdive -->
> 딥다이브: 배경 → 원리 → 트레이드오프 → 실전

## 배경/문제 정의
- 

## 핵심 원리
- 

## 트레이드오프
- 

## 아키텍처/내부 동작
- 

## 실전 적용 체크리스트
- 
`,
  };


  if (md.startsWith("<!-- STYLE:")) return md;

  return headerByPreset[preset] + "\n\n" + md;
}

export default function Home() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [template, setTemplate] = useState<StylePreset>("tutorial");

  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [user, setUser] = useState<any>(null);

 
  const meta = useMemo(() => generateMetaDescription(result), [result]);


  const mbtiThemes: any = {
    INTJ: "planet-purple",
    ENFP: "planet-orange",
    ISTJ: "planet-blue",
    INFJ: "planet-indigo",
    ESTP: "planet-red",
    INTP: "planet-cyan",
  };

  const themeClass = user ? mbtiThemes[user.mbti] : "";

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);


  const generateBlog = async () => {
    try {
      setLoading(true);
      setError("");

      if (!topic) {
        setError("주제를 입력해주세요.");
        return;
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          keywords,
          template,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "블로그 생성 실패");
      }

      setResult(data.content || "");
      setTitle(data.title || "");
      setHashtags(data.hashtags || "");
      // meta는 서버에서 내려줘도 되고(선택), 지금은 result로 자동 생성됨
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const onApplyStyle = () => {
    if (!result) return;
    setResult((prev) => applyStyleTemplate(prev, template));
  };


  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  
  const downloadFile = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const markdownToHtml = async (markdown: string) => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(markdown);

    return String(file);
  };

 
  const buildHtmlDocument = (docTitle: string, bodyHtml: string, metaDesc: string) => {
    const safeTitle = docTitle || "Blog Post";
    const safeMeta = (metaDesc || "").replaceAll('"', "&quot;");
    return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${safeTitle}</title>
  <meta name="description" content="${safeMeta}" />
</head>
<body>
${bodyHtml}
</body>
</html>`;
  };

 
  const baseFileName = (title || topic || "post").replace(/[\\/:*?"<>|]/g, "-").trim();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden px-3 md:px-0">
        {/* */}
        <div className={`planet ${themeClass}`}></div>

        {/*모바일에서 높이/폭 반응형 */}
        <div className="relative w-full max-w-5xl h-[92vh] md:h-[720px] bg-white/5 backdrop-blur-md border border-cyan-400/40 rounded-3xl shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-4 md:px-6 border-b border-cyan-400/20">
            <div className="text-cyan-300 font-bold">🚀 AI COMMAND CONSOLE</div>
            <div className="text-sm text-gray-300">
              Pilot: {user ? user.username : "Guest"}
            </div>
          </div>

          <div className="absolute top-20 left-0 right-0 bottom-6 flex items-center justify-center">
            {/*  [변경] 모바일에서 w-full */}
            <div className="w-full md:w-4/5 h-full bg-black/40 rounded-2xl border border-cyan-400/30 p-4 md:p-6 overflow-auto">
              <div className="flex flex-col gap-4">
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="주제 입력"
                  className="p-3 rounded bg-gray-800"
                />

                <input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="키워드 입력 (쉼표로 구분)"
                  className="p-3 rounded bg-gray-800"
                />
                {/*   */}
                <div className="flex flex-col md:flex-row gap-3 md:items-center">
                  {/*   */}
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value as StylePreset)}
                    className="p-3 rounded bg-gray-800 w-full md:w-auto"
                  >
                    <option value="tutorial">튜토리얼</option>
                    <option value="til">TIL</option>
                    <option value="troubleshooting">트러블슈팅</option>
                    <option value="deepdive">딥다이브</option>
                  </select>

                  <button
                    onClick={onApplyStyle}
                    disabled={!result}
                    className="w-full md:w-auto bg-white/10 hover:bg-white/15 border border-cyan-400/30 text-cyan-200 px-4 py-3 rounded-xl disabled:opacity-40"
                    title="현재 글 상단에 스타일 템플릿을 추가합니다(로컬)."
                  >
                    스타일 적용
                  </button>

                  <button
                    onClick={generateBlog}
                    className="w-full md:w-auto bg-cyan-500 text-white px-6 py-3 rounded-xl"
                  >
                    글 생성
                  </button>
                </div>

                {error ? <p className="text-red-400">{error}</p> : null}

                <div className="mt-2">
                  {loading ? (
                    <p className="text-cyan-400 animate-pulse">🚀 에너지 생성 중...</p>
                  ) : result ? (
                    <>
                      {/*  */}
                      <Editor content={result} onChange={setResult} />

                      {/*  */}
                      <div className="mt-4 flex flex-col md:flex-row gap-2 md:items-center">
                        <button
                          onClick={() =>
                            downloadFile(
                              `${baseFileName}.md`,
                              result,
                              "text/markdown;charset=utf-8"
                            )
                          }
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
                        >
                          Markdown 다운로드
                        </button>

                        <button
                          onClick={async () => {
                            const htmlBody = await markdownToHtml(result);
                            const htmlDoc = buildHtmlDocument(
                              title || `${topic} 완벽 가이드`,
                              htmlBody,
                              meta
                            );
                            downloadFile(
                              `${baseFileName}.html`,
                              htmlDoc,
                              "text/html;charset=utf-8"
                            );
                          }}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
                        >
                          HTML 다운로드
                        </button>

                        <button
                          onClick={() => copyToClipboard(result)}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
                        >
                          본문 복사
                        </button>

                        <button
                          onClick={async () => {
                            const htmlBody = await markdownToHtml(result);
                            const htmlDoc = buildHtmlDocument(
                              title || `${topic} 완벽 가이드`,
                              htmlBody,
                              meta
                            );
                            await copyToClipboard(htmlDoc);
                          }}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
                        >
                          HTML 복사
                        </button>

                        <button
                          onClick={() => copyToClipboard(meta)}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
                        >
                          메타 복사
                        </button>
                      </div>

                      {/*   */}
                      <div className="mt-5 p-4 rounded-2xl border border-cyan-400/20 bg-black/30">
                        <div className="flex items-center justify-between">
                          <div className="text-cyan-200 font-semibold">
                            SEO Meta Description
                          </div>
                          <div className="text-xs text-gray-400">
                            {meta.length}/160
                          </div>
                        </div>

                        <textarea
                          className="mt-2 w-full h-20 p-3 rounded bg-gray-900 border border-white/10 text-sm"
                          readOnly
                          value={meta}
                        />
                      </div>

                      {/* */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 rounded-2xl border border-cyan-400/20 bg-black/30">
                          <div className="text-cyan-200 font-semibold">Title</div>
                          <div className="mt-1 text-sm text-gray-200">
                            {title || "(제목 없음)"}
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl border border-cyan-400/20 bg-black/30">
                          <div className="text-cyan-200 font-semibold">Hashtags</div>
                          <div className="mt-1 text-sm text-gray-200">
                            {hashtags || "(해시태그 없음)"}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500">아직 생성된 콘텐츠가 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}