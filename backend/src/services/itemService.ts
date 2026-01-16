import { items } from '../data/items'
import { keywords } from '../data/keywords'

interface RecommendParams {
  color?: string
  material?: string
  category?: string
  limit?: number
}

interface LuckyKeywords {
  color?: { value: string }
  material?: { value: string }
  category?: { value: string }
}

interface RecommendedItem {
  id: number
  name: string
  artist: { id: number; name: string; profileImage?: string }
  price: number
  originalPrice?: number
  discountRate?: number
  image: string
  tags: string[]
  matchScore: number
  matchReasons: string[]
  productUrl: string
  searchUrl: string
}

/**
 * 아이디어스 검색 URL 생성
 */
function generateIdusSearchUrl(keyword: string): string {
  return `https://www.idus.com/v2/search?keyword=${encodeURIComponent(keyword)}`
}

/**
 * 컬러 키워드로 검색 키워드 찾기
 */
function findColorSearchKeyword(colorName: string): string {
  const color = keywords.colors.find(c => c.name === colorName)
  return color?.searchKeyword || colorName
}

/**
 * 소재 키워드로 검색 키워드 찾기
 */
function findMaterialSearchKeyword(materialName: string): string {
  const material = keywords.materials.find(m => m.name === materialName)
  return material?.searchKeyword || materialName
}

/**
 * 카테고리로 URL 찾기
 */
function findCategoryUrl(categoryName: string): string {
  const category = keywords.categories.find(c => c.name === categoryName)
  return category?.categoryUrl || generateIdusSearchUrl(categoryName)
}

/**
 * 추천 아이템 조회 - 실제 아이디어스 검색 URL 포함
 */
export function getRecommendedItems(params: RecommendParams): RecommendedItem[] {
  const { color, material, category, limit = 3 } = params
  
  const colorKeyword = color ? findColorSearchKeyword(color) : ''
  const materialKeyword = material ? findMaterialSearchKeyword(material) : ''
  
  const scoredItems = items.items.map((item) => {
    let matchScore = 50
    const matchReasons: string[] = []
    const searchKeywords: string[] = []
    
    if (color && item.tags.some(tag => 
      tag.toLowerCase().includes(color.toLowerCase()) || 
      color.toLowerCase().includes(tag.toLowerCase()) ||
      tag.toLowerCase().includes(colorKeyword.toLowerCase())
    )) {
      matchScore += 20
      matchReasons.push('오늘의 컬러 매칭')
      searchKeywords.push(colorKeyword)
    }
    
    if (material && item.tags.some(tag => 
      tag.toLowerCase().includes(material.toLowerCase()) ||
      material.toLowerCase().includes(tag.toLowerCase()) ||
      tag.toLowerCase().includes(materialKeyword.toLowerCase())
    )) {
      matchScore += 25
      matchReasons.push('끌리는 소재 매칭')
      searchKeywords.push(materialKeyword)
    }
    
    if (category && item.category.toLowerCase().includes(category.toLowerCase())) {
      matchScore += 15
      matchReasons.push('취향 카테고리 매칭')
    }
    
    if (matchReasons.length === 0) {
      matchReasons.push('오늘의 추천 작품')
    }

    let searchUrl: string
    if (searchKeywords.length > 0) {
      searchUrl = generateIdusSearchUrl(searchKeywords.join(' '))
    } else if (category) {
      searchUrl = findCategoryUrl(category)
    } else {
      searchUrl = generateIdusSearchUrl(item.tags[0] || '핸드메이드')
    }
    
    return {
      ...item,
      matchScore: Math.min(100, matchScore),
      matchReasons,
      searchUrl,
      productUrl: searchUrl,
    }
  })
  
  return scoredItems
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit)
}

/**
 * 오늘의 행운 아이템 - 키워드 조합 검색 URL
 */
export function getLuckyItem(luckyKeywords: LuckyKeywords): RecommendedItem | null {
  const { color, material, category } = luckyKeywords
  
  const searchTerms: string[] = []
  
  if (color?.value) {
    searchTerms.push(findColorSearchKeyword(color.value))
  }
  if (material?.value) {
    searchTerms.push(findMaterialSearchKeyword(material.value))
  }
  
  const combinedSearchUrl = searchTerms.length > 0
    ? generateIdusSearchUrl(searchTerms.join(' '))
    : category?.value 
      ? findCategoryUrl(category.value)
      : generateIdusSearchUrl('핸드메이드')

  const recommendedItems = getRecommendedItems({
    color: color?.value,
    material: material?.value,
    category: category?.value,
    limit: 1,
  })
  
  if (recommendedItems.length === 0) {
    return null
  }
  
  const item = recommendedItems[0]
  return {
    ...item,
    name: `🍀 ${item.name}`,
    searchUrl: combinedSearchUrl,
    productUrl: combinedSearchUrl,
  }
}

/**
 * 키워드 기반 아이디어스 검색 URL 생성 유틸리티
 */
export function generateSearchUrls(luckyKeywords: LuckyKeywords) {
  const urls: Record<string, string> = {}
  
  if (luckyKeywords.color?.value) {
    const colorKeyword = findColorSearchKeyword(luckyKeywords.color.value)
    urls.colorSearch = generateIdusSearchUrl(colorKeyword)
  }
  
  if (luckyKeywords.material?.value) {
    const materialKeyword = findMaterialSearchKeyword(luckyKeywords.material.value)
    urls.materialSearch = generateIdusSearchUrl(materialKeyword)
  }
  
  if (luckyKeywords.category?.value) {
    urls.categoryUrl = findCategoryUrl(luckyKeywords.category.value)
  }
  
  const allKeywords: string[] = []
  if (luckyKeywords.color?.value) allKeywords.push(findColorSearchKeyword(luckyKeywords.color.value))
  if (luckyKeywords.material?.value) allKeywords.push(findMaterialSearchKeyword(luckyKeywords.material.value))
  
  if (allKeywords.length > 0) {
    urls.combinedSearch = generateIdusSearchUrl(allKeywords.join(' '))
  }
  
  return urls
}
