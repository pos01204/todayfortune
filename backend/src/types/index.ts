// 운세 점수 타입
export interface ScoreItem {
  label: string
  score: number
  icon: string
}

export interface Scores {
  money: ScoreItem
  work: ScoreItem
  love: ScoreItem
  creativity: ScoreItem
  health: ScoreItem
}

// 행운 키워드 타입
export interface KeywordItem {
  label: string
  value: string | number
  icon: string
  hex?: string
}

export interface LuckyKeywords {
  number: KeywordItem
  direction: KeywordItem
  color: KeywordItem
  material: KeywordItem
  category: KeywordItem
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

// 아이템 타입
export interface Artist {
  id: number
  name: string
  profileImage?: string
}

export interface Item {
  id: number
  name: string
  artist: Artist
  price: number
  originalPrice?: number
  discountRate?: number
  image: string
  tags: string[]
  category: string
  productUrl: string
}

export interface RecommendedItem extends Item {
  matchScore: number
  matchReasons: string[]
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
