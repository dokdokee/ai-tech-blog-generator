"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [template, setTemplate] = useState("tutorial");
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [hashtags, setHashtags] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [result, setResult] = useState("");


const handleGenerate = () => {
  setError("");

  // 입력값 검사
  if (!topic) {
    setError("주제를 입력해주세요.");
    return;
  }

  setLoading(true);

  try {
    setTimeout(() => {
      setTitle(`${topic} 완벽 가이드`);
      setContent(
        `${topic}은(는) 중요한 기술입니다.\n\n` +
        `${keywords}를 중심으로 핵심 개념을 설명합니다.\n\n` +
        `1. 기본 개념\n2. 사용 방법\n3. 실무 활용`
      );
      setHashtags(`#${topic} #개발 #${template}`);

      setLoading(false);
    }, 1000);
  } catch (e) {
    setError("글 생성 중 문제가 발생했습니다. 다시 시도해주세요.");
    setLoading(false);
  }
};



  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI 기술 블로그
        </h1>
      

        <div className="flex flex-col items-center gap-4 mt-6 w-full">

        {/* 주제 입력 */}
       </div> <div className="w-full">
          <label className="text-sm text-gray-300">주제</label>
          <input
            className="w-full p-4 text-lg mt-1 rounded-lg bg-gray-800 text-white"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="예: Next.js란 무엇인가"
          />
        </div>

        {/* 키워드 입력 */}
        <div className="w-full">
          <label className="text-sm text-gray-300">키워드</label>
          <input
            className="w-full p-3 mt-1 rounded-lg bg-gray-800 text-white"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="예: React, SSR, SEO"
          />
        </div>

        {/* 템플릿 선택 */}
        <div className="w-full">
          <label className="text-sm text-gray-300">템플릿 선택</label>
          <select
            className="w-full p-3 mt-1 rounded-lg bg-gray-800 text-white"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="tutorial">튜토리얼</option>
            <option value="news">기술 뉴스</option>
            <option value="opinion">의견 글</option>
          </select>
        </div>

        {/* 버튼 */}
        <button
          onClick={handleGenerate}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg"
        >
          글 생성하기 
        </button>

        {/* 결과 출력 */}
        {loading && (
  <div className="text-green-400 text-center">
    글 생성 중...
  </div>
        )}

{error && (
  <div className="w-full bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-center">
    {error}
  </div>
)}

      

{title && !loading && (
  <div className="w-full bg-gray-700 p-6 rounded-lg space-y-4">
    
    <h2 className="text-xl font-bold text-green-400">
      {title}
    </h2>

    <p className="text-gray-200 whitespace-pre-wrap">
      {content}
    </p>

    <div className="text-green-300">
      {hashtags}
    </div>

  </div>
)}

      </div>
    </main>
  );
}
