# 🧡 아이디어스 오늘의 취향 운세

> "나만의 이야기를 만들어가고, 나도 몰랐던 취향을 발견하고,
> 비슷한 가치를 나누는 사람과 소통하는 특별한 일상"

바나프레소 포춘 메시지 이벤트를 레퍼런스로 한 **아이디어스 새해 취향 운세 이벤트 페이지**입니다.

## ✨ 프로젝트 특징

### 아이디어스다움을 담다

- **STORY (나만의 이야기)**: 생년월일로 시작되는 나만의 취향 이야기
- **DISCOVERY (취향의 발견)**: 나도 몰랐던 취향을 발견하는 기쁨  
- **CONNECTION (따뜻한 소통)**: 작가의 정성이 담긴 작품과의 연결

### 운세 카테고리 (아이디어스 버전)

| 카테고리 | 아이콘 | 설명 |
|---------|--------|------|
| 창작 에너지 | 🎨 | 오늘 새로운 것을 만들고 싶은 정도 |
| 선물 운 | 🎁 | 소중한 사람에게 마음을 전하기 좋은 정도 |
| 발견 운 | 🔍 | 새로운 취향을 발견할 가능성 |
| 인연 운 | 💕 | 특별한 작가/작품과의 인연 |
| 영감 지수 | ✨ | 일상에서 영감을 받을 가능성 |

## 📁 프로젝트 구조

```
todayfortune/
├── frontend/          # Next.js 프론트엔드 (Vercel)
│   ├── src/
│   │   ├── app/      # 페이지들
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── brand/        # 아이디어스 브랜드 에셋
│   ├── fonts/        # SUITE 폰트
│   └── loading/      # 로딩 GIF
│
├── backend/          # Express 백엔드 (Railway)
│   └── src/
│       ├── routes/
│       ├── services/
│       └── data/
│
└── docs/             # 설계 문서
    ├── ARCHITECTURE.md
    └── API.md
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18+
- npm 또는 yarn

### 백엔드 실행

```bash
cd backend
npm install
npm run dev
```

서버가 `http://localhost:3001`에서 실행됩니다.

### 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

## 🎨 브랜드 에셋

### 컬러

```css
--idus-orange: #FF6B35;    /* 프라이머리 */
--cream: #FFF9F5;          /* 배경 */
--accent-coral: #FF8A65;   /* 강조 */
--accent-peach: #FFCCBC;   /* 보조 */
```

### 폰트

- **SUITE**: 아이디어스 브랜드 폰트

### 일러스트

- 선물, 주얼리, 캔들, 도자기 등 아이디어스 일러스트 활용

## 📡 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/fortune` | 취향 운세 생성 |
| GET | `/api/items/recommend` | 추천 작품 조회 |
| GET | `/health` | 헬스체크 |

## 🚢 배포

### Vercel (Frontend)

1. GitHub 연결 → Root: `frontend`
2. 환경변수: `NEXT_PUBLIC_API_URL` = Railway 백엔드 URL

### Railway (Backend)

1. GitHub 연결 → Root: `backend`
2. 자동 빌드 & 배포

## 📝 문서

- [시스템 아키텍처](./docs/ARCHITECTURE.md)
- [API 명세서](./docs/API.md)

## 🤝 브랜드 가이드

### DO ✅
- 따뜻하고 친근한 말투
- "작품"이라는 표현 사용
- 작가의 정성과 이야기 강조
- 취향과 발견의 즐거움 전달

### DON'T ❌
- 최저가, 빠른 배송 강조
- "상품", "물건"이라는 표현
- 차갑고 기계적인 톤

---

**Made with 🧡 for 아이디어스**

아이디어스는 작가와 고객의 취향을 연결하는 핸드메이드 라이프스타일 플랫폼입니다.
