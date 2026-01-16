import { v4 as uuidv4 } from 'uuid'
import fortunes from '../data/fortunes.json' assert { type: 'json' }
import keywords from '../data/keywords.json' assert { type: 'json' }

interface ColorKeyword {
  name: string
  hex: string
  searchKeyword: string
}

interface MaterialKeyword {
  name: string
  searchKeyword: string
  description: string
}

interface CategoryKeyword {
  name: string
  searchKeyword: string
  categoryUrl: string
  description: string
}

interface FortuneResult {
  id: string
  userName: string
  message: string
  scores: Record<string, { label: string; score: number; icon: string }>
  luckyKeywords: Record<string, { 
    label: string
    value: string | number
    icon: string
    hex?: string
    searchUrl?: string  // 아이디어스 검색 URL
    categoryUrl?: string // 카테고리 URL
  }>
  zodiac: { animal: string; emoji: string; year: number }
  constellation: { name: string; emoji: string; period: string }
  generatedAt: string
}

/**
 * 아이디어스 검색 URL 생성
 */
function generateIdusSearchUrl(keyword: string): string {
  return `https://www.idus.com/v2/search?keyword=${encodeURIComponent(keyword)}`
}

/**
 * 12지신 띠 계산
 */
function getZodiac(year: number) {
  const zodiacAnimals = [
    { animal: '쥐', emoji: '🐭' },
    { animal: '소', emoji: '🐮' },
    { animal: '호랑이', emoji: '🐯' },
    { animal: '토끼', emoji: '🐰' },
    { animal: '용', emoji: '🐲' },
    { animal: '뱀', emoji: '🐍' },
    { animal: '말', emoji: '🐴' },
    { animal: '양', emoji: '🐑' },
    { animal: '원숭이', emoji: '🐵' },
    { animal: '닭', emoji: '🐔' },
    { animal: '개', emoji: '🐶' },
    { animal: '돼지', emoji: '🐷' },
  ]
  
  const index = (year - 4) % 12
  return { ...zodiacAnimals[index], year }
}

/**
 * 별자리 계산
 */
function getConstellation(month: number, day: number) {
  const constellations = [
    { name: '염소자리', emoji: '♑', start: [12, 22], end: [1, 19] },
    { name: '물병자리', emoji: '♒', start: [1, 20], end: [2, 18] },
    { name: '물고기자리', emoji: '♓', start: [2, 19], end: [3, 20] },
    { name: '양자리', emoji: '♈', start: [3, 21], end: [4, 19] },
    { name: '황소자리', emoji: '♉', start: [4, 20], end: [5, 20] },
    { name: '쌍둥이자리', emoji: '♊', start: [5, 21], end: [6, 21] },
    { name: '게자리', emoji: '♋', start: [6, 22], end: [7, 22] },
    { name: '사자자리', emoji: '♌', start: [7, 23], end: [8, 22] },
    { name: '처녀자리', emoji: '♍', start: [8, 23], end: [9, 22] },
    { name: '천칭자리', emoji: '♎', start: [9, 23], end: [10, 23] },
    { name: '전갈자리', emoji: '♏', start: [10, 24], end: [11, 22] },
    { name: '사수자리', emoji: '♐', start: [11, 23], end: [12, 21] },
  ]

  for (const c of constellations) {
    const [startMonth, startDay] = c.start
    const [endMonth, endDay] = c.end
    
    if (startMonth === 12 && endMonth === 1) {
      if ((month === 12 && day >= startDay) || (month === 1 && day <= endDay)) {
        return { name: c.name, emoji: c.emoji, period: `${startMonth}/${startDay} - ${endMonth}/${endDay}` }
      }
    } else {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return { name: c.name, emoji: c.emoji, period: `${startMonth}/${startDay} - ${endMonth}/${endDay}` }
      }
    }
  }
  
  return constellations[0]
}

/**
 * 시드 기반 난수 생성
 */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/**
 * 배열에서 시드 기반 랜덤 선택
 */
function seededSelect<T>(arr: T[], seed: number): T {
  const index = Math.floor(seededRandom(seed) * arr.length)
  return arr[index]
}

/**
 * 점수 생성 (55-100 범위)
 */
function generateScore(seed: number, bonus: number = 0): number {
  const base = Math.floor(seededRandom(seed) * 40) + 55
  return Math.min(100, base + bonus)
}

/**
 * 운세 생성 - 아이디어스 취향 운세 버전 (실제 URL 포함)
 */
export function generateFortune(birthDate: string, name?: string): FortuneResult {
  const [yearStr, monthStr, dayStr] = birthDate.split('-')
  const year = parseInt(yearStr)
  const month = parseInt(monthStr)
  const day = parseInt(dayStr)
  
  // 오늘 날짜 + 생년월일 조합으로 시드 생성
  const today = new Date()
  const seed = year + month * 100 + day * 10000 + today.getDate() * 100000 + (today.getMonth() + 1) * 1000000
  
  // 운세 메시지 선택
  const message = seededSelect(fortunes.messages, seed)
  
  // 행운 키워드 선택 (타입 명시)
  const luckyColor = seededSelect(keywords.colors, seed + 1) as ColorKeyword
  const luckyMaterial = seededSelect(keywords.materials, seed + 2) as MaterialKeyword
  const luckyCategory = seededSelect(keywords.categories, seed + 3) as CategoryKeyword
  const luckyDirection = seededSelect(keywords.directions, seed + 4)
  const luckyNumber = (Math.floor(seededRandom(seed + 5) * 9) + 1)
  
  const zodiac = getZodiac(year)
  const constellation = getConstellation(month, day)
  
  // 아이디어스 취향 카테고리 점수 + 실제 검색 URL
  return {
    id: `fortune_${today.toISOString().split('T')[0]}_${uuidv4().substring(0, 8)}`,
    userName: name || '회원',
    message: message.text,
    scores: {
      creativity: { label: '창작 에너지', score: generateScore(seed + 10, 10), icon: '🎨' },
      gift: { label: '선물 운', score: generateScore(seed + 20), icon: '🎁' },
      discovery: { label: '발견 운', score: generateScore(seed + 30), icon: '🔍' },
      connection: { label: '인연 운', score: generateScore(seed + 40), icon: '💕' },
      inspiration: { label: '영감 지수', score: generateScore(seed + 50), icon: '✨' },
    },
    luckyKeywords: {
      number: { 
        label: '행운의 숫자', 
        value: luckyNumber, 
        icon: '🔮' 
      },
      direction: { 
        label: '좋은 방향', 
        value: luckyDirection, 
        icon: '🧭' 
      },
      color: { 
        label: '오늘의 컬러', 
        value: luckyColor.name, 
        hex: luckyColor.hex, 
        icon: '🎨',
        searchUrl: generateIdusSearchUrl(luckyColor.searchKeyword)
      },
      material: { 
        label: '끌리는 소재', 
        value: luckyMaterial.name, 
        icon: '✋',
        searchUrl: generateIdusSearchUrl(luckyMaterial.searchKeyword)
      },
      category: { 
        label: '취향 카테고리', 
        value: luckyCategory.name, 
        icon: '💝',
        searchUrl: generateIdusSearchUrl(luckyCategory.searchKeyword),
        categoryUrl: luckyCategory.categoryUrl
      },
    },
    zodiac,
    constellation,
    generatedAt: new Date().toISOString(),
  }
}
