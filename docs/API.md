# 🔮 아이디어스 운세 이벤트 API 명세서

## Base URL
- **개발**: `http://localhost:3001`
- **프로덕션**: `https://idus-fortune-api.railway.app`

---

## 인증
현재 버전에서는 인증 없이 접근 가능 (이벤트 페이지용)

---

## 엔드포인트

### 1. 운세 조회

오늘의 운세를 생성하여 반환합니다.

```
POST /api/fortune
```

#### Request Body
```json
{
  "birthDate": "1990-05-15",
  "name": "홍길동"  // optional, 결과 표시용
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "fortune_20240115_abc123",
    "userName": "홍길동",
    "message": "큰 용이 하늘을 날 듯, 오늘은 대담한 결정을 내려도 좋습니다. 용기 있는 한 걸음이 인생을 바꾸는 열쇠가 될 것입니다.",
    "scores": {
      "money": {
        "label": "금전운",
        "score": 77,
        "icon": "💰"
      },
      "work": {
        "label": "사업운", 
        "score": 84,
        "icon": "💼"
      },
      "love": {
        "label": "애정운",
        "score": 71,
        "icon": "💕"
      },
      "creativity": {
        "label": "창작운",
        "score": 95,
        "icon": "🎨"
      },
      "health": {
        "label": "건강운",
        "score": 100,
        "icon": "💪"
      }
    },
    "luckyKeywords": {
      "number": {
        "label": "숫자",
        "value": 8,
        "icon": "🔢"
      },
      "direction": {
        "label": "방향",
        "value": "동쪽",
        "icon": "🧭"
      },
      "color": {
        "label": "컬러",
        "value": "코랄 핑크",
        "hex": "#FF7F7F",
        "icon": "🎨"
      },
      "material": {
        "label": "소재",
        "value": "천연 가죽",
        "icon": "🧶"
      },
      "category": {
        "label": "카테고리",
        "value": "액세서리",
        "icon": "🏷️"
      }
    },
    "zodiac": {
      "animal": "말",
      "emoji": "🐴",
      "year": 1990
    },
    "constellation": {
      "name": "황소자리",
      "emoji": "♉",
      "period": "4/20 - 5/20"
    },
    "generatedAt": "2024-01-15T09:30:00Z"
  }
}
```

#### Error Response (400 Bad Request)
```json
{
  "success": false,
  "error": {
    "code": "INVALID_BIRTH_DATE",
    "message": "올바른 생년월일 형식이 아닙니다. (YYYY-MM-DD)"
  }
}
```

---

### 2. 추천 작품 조회

행운 키워드를 기반으로 작품을 추천합니다.

```
GET /api/items/recommend
```

#### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|-----|------|
| color | string | ✗ | 행운의 컬러 |
| material | string | ✗ | 행운의 소재 |
| category | string | ✗ | 행운의 카테고리 |
| limit | number | ✗ | 반환할 작품 수 (기본 3) |

#### Request Example
```
GET /api/items/recommend?color=코랄핑크&material=가죽&category=액세서리&limit=3
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 12345,
        "name": "행운의 가죽 팔찌 - 코랄 컬러",
        "artist": {
          "id": 567,
          "name": "레더공방",
          "profileImage": "https://..."
        },
        "price": 35000,
        "originalPrice": 42000,
        "discountRate": 17,
        "image": "https://...",
        "tags": ["가죽", "팔찌", "핑크"],
        "matchScore": 95,
        "matchReasons": ["행운의 컬러 매칭", "행운의 소재 매칭"],
        "productUrl": "https://www.idus.com/v2/product/12345"
      },
      {
        "id": 12346,
        "name": "천연 가죽 카드지갑",
        "artist": {
          "id": 568,
          "name": "핸드메이드 공방"
        },
        "price": 28000,
        "image": "https://...",
        "tags": ["가죽", "지갑"],
        "matchScore": 72,
        "matchReasons": ["행운의 소재 매칭"],
        "productUrl": "https://www.idus.com/v2/product/12346"
      }
    ],
    "totalCount": 3,
    "matchCriteria": {
      "color": "코랄 핑크",
      "material": "가죽",
      "category": "액세서리"
    }
  }
}
```

---

### 3. 오늘의 행운 아이템 (메인 추천)

가장 높은 매칭 점수의 단일 작품을 반환합니다.

```
POST /api/items/lucky
```

#### Request Body
```json
{
  "fortuneId": "fortune_20240115_abc123",
  "luckyKeywords": {
    "color": "코랄 핑크",
    "material": "천연 가죽", 
    "category": "액세서리"
  }
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "luckyItem": {
      "id": 12345,
      "name": "🍀 오늘의 행운 아이템",
      "subtitle": "행운의 가죽 팔찌",
      "description": "오늘 당신의 행운 컬러인 코랄 핑크와 행운 소재인 천연 가죽으로 만든 특별한 아이템입니다.",
      "artist": {
        "id": 567,
        "name": "레더공방"
      },
      "price": 35000,
      "image": "https://...",
      "productUrl": "https://www.idus.com/v2/product/12345",
      "matchHighlight": "행운의 컬러 + 소재 완벽 매칭!"
    }
  }
}
```

---

### 4. 공유 이미지 생성

운세 결과를 이미지로 생성합니다.

```
POST /api/share/image
```

#### Request Body
```json
{
  "fortuneId": "fortune_20240115_abc123"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://..../share/fortune_20240115_abc123.png",
    "expiresAt": "2024-01-16T00:00:00Z"
  }
}
```

---

### 5. 운세 통계 (관리자용)

```
GET /api/admin/stats
```

#### Response
```json
{
  "success": true,
  "data": {
    "totalFortuneGenerated": 15234,
    "todayCount": 523,
    "topLuckyColors": [
      { "name": "코랄 핑크", "count": 234 },
      { "name": "민트 그린", "count": 198 }
    ],
    "conversionRate": 12.5
  }
}
```

---

## 에러 코드

| 코드 | HTTP Status | 설명 |
|-----|-------------|------|
| INVALID_BIRTH_DATE | 400 | 잘못된 생년월일 형식 |
| FUTURE_DATE | 400 | 미래 날짜 입력 |
| FORTUNE_NOT_FOUND | 404 | 운세 ID를 찾을 수 없음 |
| ITEM_NOT_FOUND | 404 | 작품을 찾을 수 없음 |
| RATE_LIMIT_EXCEEDED | 429 | 요청 횟수 초과 |
| INTERNAL_ERROR | 500 | 서버 내부 오류 |

---

## Rate Limiting

| 엔드포인트 | 제한 |
|-----------|------|
| POST /api/fortune | 분당 10회 (IP 기준) |
| GET /api/items/* | 분당 30회 |
| POST /api/share/* | 분당 5회 |

---

## CORS 설정

허용 Origin:
- `http://localhost:3000` (개발)
- `https://idus-fortune.vercel.app` (프로덕션)
- `https://www.idus.com` (아이디어스 연동 시)
