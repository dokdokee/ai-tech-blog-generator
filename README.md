
#  AI Tech Blog Generator

AI 기반 기술 블로그 자동 생성 및 편집 플랫폼입니다.
Markdown 에디터, 코드 하이라이팅, SEO 메타 자동 생성, HTML/Markdown 다운로드 기능을 제공합니다.

---

##  주요 기능

###  1. AI 기술 블로그 자동 생성

* 주제 + 키워드 입력
* 스타일 선택 (튜토리얼 / TIL / 트러블슈팅 / 딥다이브)
* OpenAI API 기반 자동 생성

---

###  2. Markdown 실시간 편집

* 좌측: Markdown 입력
* 우측: 실시간 Preview
* Prism 기반 코드 문법 하이라이팅

지원 언어:

* JavaScript
* TypeScript
* Bash

---

###  3. 스타일 템플릿 4종

* Tutorial
* TIL
* Troubleshooting
* Deep Dive

스타일 버튼 클릭 시 구조 템플릿 자동 삽입

---

###  4. SEO 자동 메타 설명 생성

* 본문 기반 150~160자 자동 요약
* Meta Description 복사 버튼 제공
* HTML 다운로드 시 자동 삽입

---

###  5. 파일 다운로드 기능

| 기능            | 설명                       |
| ------------- | ------------------------ |
| Markdown 다운로드 | `.md` 파일로 저장             |
| HTML 다운로드     | SEO 메타 포함 완전한 HTML 파일 생성 |
| 본문 복사         | Markdown 텍스트 복사          |
| HTML 복사       | 전체 HTML 문서 복사            |
| 메타 복사         | SEO Description 복사       |

---

###  6. 모바일 반응형 UI

* 모바일: 1열 레이아웃
* 데스크탑: 2열 에디터/프리뷰
* 버튼 자동 줄바꿈

---

##  기술 스택

* **Next.js 14 (App Router)**
* **TypeScript**
* **OpenAI API**
* **Tailwind CSS**
* **Prism.js**
* **Marked**
* **Vercel Deployment**

---

##  프로젝트 구조

```
app/
 ├─ api/
 │   └─ generate/
 │       └─ route.ts
 ├─ components/
 │   ├─ Editor.tsx
 │   └─ Navbar.tsx
 ├─ login/
 │   └─ page.tsx
 └─ page.tsx
```

---

##  로컬 실행 방법

### 1️⃣ 저장소 클론

```bash
git clone https://github.com/yourname/yourrepo.git
cd yourrepo
```

### 2️⃣ 패키지 설치

```bash
npm install
```

### 3️⃣ 환경 변수 설정

프로젝트 루트에 `.env.local` 생성:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
```

### 4️⃣ 개발 서버 실행

```bash
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

---

## Vercel 배포 방법

1. GitHub에 push
2. Vercel → New Project
3. GitHub 레포 선택
4. Environment Variables에 추가:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
```

5. Deploy

---

##  환경 변수

| 변수명            | 설명           |
| -------------- | ------------ |
| OPENAI_API_KEY | OpenAI API 키 |

---

##  API 엔드포인트

### POST `/api/generate`

요청:

```json
{
  "topic": "Next.js SEO 최적화",
  "keywords": "meta tag, SSR",
  "template": "tutorial"
}
```

응답:

```json
{
  "title": "...",
  "content": "...",
  "hashtags": "...",
  "metaDescription": "..."
}
```

---

##  향후 개선 아이디어

* 사용자 로그인 기반 저장 기능
* DB 연동 (Supabase / PlanetScale)
* SEO 점수 분석기



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.







