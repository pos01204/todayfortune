import { v4 as uuidv4 } from 'uuid'
import { fortunes } from '../data/fortunes'
import { keywords } from '../data/keywords'

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
    searchUrl?: string
    categoryUrl?: string
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
function getConstellation(month: number, day: number): { name: string; emoji: string; period: string } {
  const constellations = [
    { name: '염소자리', emoji: '♑', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { name: '물병자리', emoji: '♒', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { name: '물고기자리', emoji: '♓', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { name: '양자리', emoji: '♈', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { name: '황소자리', emoji: '♉', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { name: '쌍둥이자리', emoji: '♊', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
    { name: '게자리', emoji: '♋', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
    { name: '사자자리', emoji: '♌', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { name: '처녀자리', emoji: '♍', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { name: '천칭자리', emoji: '♎', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
    { name: '전갈자리', emoji: '♏', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
    { name: '사수자리', emoji: '♐', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 },
  ]

  for (const c of constellations) {
    if (c.startMonth === 12 && c.endMonth === 1) {
      if ((month === 12 && day >= c.startDay) || (month === 1 && day <= c.endDay)) {
        return { name: c.name, emoji: c.emoji, period: `${c.startMonth}/${c.startDay} - ${c.endMonth}/${c.endDay}` }
      }
    } else {
      if ((month === c.startMonth && day >= c.startDay) || (month === c.endMonth && day <= c.endDay)) {
        return { name: c.name, emoji: c.emoji, period: `${c.startMonth}/${c.startDay} - ${c.endMonth}/${c.endDay}` }
      }
    }
  }
  
  return { name: '물병자리', emoji: '♒', period: '1/20 - 2/18' }
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
  
  const today = new Date()
  const seed = year + month * 100 + day * 10000 + today.getDate() * 100000 + (today.getMonth() + 1) * 1000000
  
  const message = seededSelect(fortunes.messages, seed)
  
  const luckyColor = seededSelect(keywords.colors, seed + 1) as ColorKeyword
  const luckyMaterial = seededSelect(keywords.materials, seed + 2) as MaterialKeyword
  const luckyCategory = seededSelect(keywords.categories, seed + 3) as CategoryKeyword
  const luckyDirection = seededSelect(keywords.directions, seed + 4)
  const luckyNumber = (Math.floor(seededRandom(seed + 5) * 9) + 1)
  
  const zodiac = getZodiac(year)
  const constellation = getConstellation(month, day)
  
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
