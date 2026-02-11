export async function POST(req: Request) {
  const body = await req.json();
  const { topic, keywords, template } = body;

  let prompt = "";

  if (template === "tutorial") {
    prompt = `
너는 개발자를 위한 기술 블로그 작성 AI다.

주제: ${topic}
키워드: ${keywords}

초보 개발자를 위한 튜토리얼 형식의 글을 작성해라.

구조:
1. 서론
2. 본문 (단계별 설명)
3. 코드 예시
4. 결론

마크다운 형식으로 작성해라.
`;
  } else if (template === "til") {
    prompt = `
너는 개발자의 TIL 글을 작성하는 AI다.

주제: ${topic}
키워드: ${keywords}

구조:
1. 오늘 배운 것
2. 핵심 개념
3. 코드 예시
4. 정리

마크다운 형식으로 작성해라.
`;
  } else if (template === "troubleshooting") {
    prompt = `
너는 개발자의 트러블슈팅 글을 작성하는 AI다.

주제: ${topic}
키워드: ${keywords}

구조:
1. 문제 상황
2. 원인 분석
3. 해결 방법
4. 코드 예시
5. 결론

마크다운 형식으로 작성해라.
`;
  }

  // 지금은 mock 결과
  const mockResult = `
[프롬프트 테스트용 결과]

사용된 프롬프트:
${prompt}
`;

  return Response.json({
    result: mockResult,
  });
}



