# 🧡 아이디어스 오늘의 취향 운세

> "나만의 이야기를 만들어가고, 나도 몰랐던 취향을 발견하고,
> 비슷한 가치를 나누는 사람과 소통하는 특별한 일상"

바나프레소 포춘 메시지 이벤트를 레퍼런스로 한 **아이디어스 새해 취향 운세 이벤트 페이지**입니다.

## ✨ 주요 기능

- 🎨 생년월일 기반 취향 운세 생성
- 🔗 **키워드 클릭 시 실제 아이디어스 검색/카테고리 페이지로 이동**
- 💝 취향에 맞는 작품 추천 (아이디어스 연동)
- 📱 모바일 최적화 UI

## 📁 프로젝트 구조

```
todayfortune/
├── frontend/          # Next.js (Vercel 배포)
│   ├── src/
│   ├── public/        # 브랜드 에셋
│   └── package.json
│
├── backend/           # Express (Railway 배포)
│   └── src/
│       ├── routes/
│       ├── services/
│       └── data/
│
└── docs/              # 설계 문서
```

## 🚀 배포 가이드

### ⚠️ 중요: Root Directory 설정

**이 프로젝트는 모노레포 구조입니다. 배포 시 반드시 Root Directory를 설정해주세요!**

---

### Vercel (Frontend) 배포

1. [vercel.com](https://vercel.com) → Import Git Repository
2. Repository: `pos01204/todayfortune` 선택
3. **🔴 Configure Project에서:**
   - **Root Directory**: `frontend` 입력
   - Framework Preset: Next.js (자동 감지)
4. Environment Variables 설정:
   - `NEXT_PUBLIC_API_URL` = Railway 백엔드 URL (나중에 설정)
5. Deploy 클릭

![Vercel Root Directory](https://vercel.com/docs/static/concepts/projects/project-settings/root-directory.png)

---

### Railway (Backend) 배포

1. [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Repository: `pos01204/todayfortune` 선택
3. **🔴 Service Settings에서:**
   - **Root Directory**: `backend` 입력
4. Variables 탭에서:
   - `PORT` = `3001`
   - `NODE_ENV` = `production`
5. Deploy 클릭

**Railway Root Directory 설정 방법:**
- Service 클릭 → Settings → 스크롤해서 "Root Directory" 찾기 → `backend` 입력

---

### 배포 후 설정

1. Railway에서 배포된 백엔드 URL 복사 (예: `https://xxx.railway.app`)
2. Vercel → Settings → Environment Variables
3. `NEXT_PUBLIC_API_URL` = 복사한 Railway URL 입력
4. Vercel 재배포 (Deployments → ... → Redeploy)

---

## 🔗 아이디어스 연동

취향 키워드 클릭 시 실제 아이디어스로 이동:

| 키워드 | URL 예시 |
|--------|----------|
| 오늘의 컬러: 핑크 | `https://www.idus.com/v2/search?keyword=핑크` |
| 끌리는 소재: 가죽 | `https://www.idus.com/v2/search?keyword=가죽` |
| 취향 카테고리: 주얼리 | `https://www.idus.com/v2/category/jewelry` |

## 💻 로컬 개발

### 백엔드

```bash
cd backend
npm install
npm run dev
# http://localhost:3001
```

### 프론트엔드

```bash
cd frontend

# 브랜드 에셋 설정 (Windows)
.\setup.bat

# 또는 PowerShell
.\setup.ps1

npm install
npm run dev
# http://localhost:3000
```

## 🎨 브랜드 에셋

- **폰트**: SUITE (아이디어스 브랜드 폰트)
- **컬러**: 아이디어스 오렌지 `#FF6B35`
- **일러스트**: 아이디어스 공식 일러스트

## 📝 문서

- [시스템 아키텍처](./docs/ARCHITECTURE.md)
- [API 명세서](./docs/API.md)

---

**Made with 🧡 for 아이디어스**
