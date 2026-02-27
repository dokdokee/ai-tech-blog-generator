import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs"; // 중요: edge면 env/SDK 이슈 나는 경우 있음

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    console.log("OPENAI_API_KEY exists?", !!process.env.OPENAI_API_KEY);

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY가 설정되어 있지 않습니다. (.env.local 확인)" },
        { status: 400 }
      );
    }

    const { topic, keywords, template } = await req.json();

    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "topic이 필요합니다." }, { status: 400 });
    }

    const client = new OpenAI({ apiKey });

    const prompt = `
너는 기술 블로그 작성자야.
주제: ${topic}
키워드: ${keywords || ""}
스타일: ${template || "tutorial"}

아래 JSON 형식으로만 답해:
{
  "title": "...",
  "content": "마크다운 본문...",
  "hashtags": "#태그 #태그",
  "metaDescription": "150~160자 SEO 메타 설명"
}
`.trim();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    const text = completion.choices[0]?.message?.content || "";
    // LLM이 JSON을 벗어나는 경우가 있어 간단 파싱 방어
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "모델 응답 JSON 파싱 실패", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "서버 오류" },
      { status: 500 }
    );
  }
}