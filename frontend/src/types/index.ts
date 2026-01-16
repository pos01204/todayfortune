// 운세 점수 타입 - 아이디어스 취향 카테고리
export interface ScoreItem {
  label: string
  score: number
  icon: string
}

export interface Scores {
  creativity: ScoreItem   // 창작 에너지
  gift: ScoreItem         // 선물 운
  discovery: ScoreItem    // 발견 운
  connection: ScoreItem   // 인연 운
  inspiration: ScoreItem  // 영감 지수
}

// 행운 키워드 타입 (아이디어스 검색 URL 포함)
export interface KeywordItem {
  label: string
  value: string | number
  icon: string
  hex?: string           // 컬러인 경우
  searchUrl?: string     // 아이디어스 검색 URL
  categoryUrl?: string   // 카테고리 페이지 URL
}

export interface LuckyKeywords {
  number: KeywordItem      // 행운의 숫자
  direction: KeywordItem   // 좋은 방향
  color: KeywordItem       // 오늘의 컬러 (searchUrl 포함)
  material: KeywordItem    // 끌리는 소재 (searchUrl 포함)
  category: KeywordItem    // 취향 카테고리 (categoryUrl 포함)
}

// 운세 결과 타입
export interface FortuneResult {
  id: string
  userName: string
  message: string
  scores: Scores
  luckyKeywords: LuckyKeywords
  zodiac: {
    animal: string
    emoji: string
    year: number
  }
  constellation: {
    name: string
    emoji: string
    period: string
  }
  generatedAt: string
}

// 작가 타입
export interface Artist {
  id: number
  name: string
  profileImage?: string
}

// 추천 작품 타입 (실제 아이디어스 URL 포함)
export interface RecommendedItem {
  id: number
  name: string
  artist: Artist
  price: number
  originalPrice?: number
  discountRate?: number
  image: string
  tags: string[]
  category?: string
  matchScore: number
  matchReasons: string[]
  productUrl: string     // 아이디어스 검색/상품 URL
  searchUrl?: string     // 조합 검색 URL
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}
