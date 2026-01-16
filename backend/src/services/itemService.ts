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
  category: string
  matchScore: number
  matchReasons: string[]
  productUrl: string
  searchUrl: string
}

// 검색 키워드 매핑 테이블
const COLOR_SEARCH_MAP: Record<string, string> = {
  '코랄 핑크': '핑크',
  '민트 그린': '민트',
  '테라코타': '테라코타',
  '크림 베이지': '베이지',
  '라벤더 퍼플': '라벤더',
  '인디고 블루': '인디고',
  '머스타드 옐로우': '머스타드',
  '올리브 그린': '올리브',
  '버건디 레드': '버건디',
  '스카이 블루': '하늘색',
  '웜 그레이': '그레이',
  '로즈 골드': '로즈골드',
}

const MATERIAL_SEARCH_MAP: Record<string, string> = {
  '천연 가죽': '가죽',
  '스털링 실버': '실버',
  '핸드메이드 도자기': '도자기',
  '천연 목재': '원목',
  '오가닉 코튼': '면',
  '프리미엄 울': '니트',
  '14K 골드': '14k',
  '천연 원석': '원석',
  '아티잔 글라스': '유리',
  '에코 레진': '레진',
  '천연 염색': '천연염색',
  '업사이클 소재': '업사이클',
}

// 실제 아이디어스 카테고리 ID
const CATEGORY_ID_MAP: Record<string, string> = {
  '주얼리/액세서리': '1047',
  '홈리빙/인테리어': '1049',
  '패션/잡화': '1048',
  '케이스/문구': '1050',
  '식품/디저트': '1046',
  '반려동물': '1052',
  '영유아/출산': '1053',
  '뷰티/향기': '1051',
  '공예/DIY': '1054',
}

/**
 * 아이디어스 검색 URL 생성
 */
function generateIdusSearchUrl(keyword: string): string {
  return `https://www.idus.com/v2/search?keyword=${encodeURIComponent(keyword)}`
}

/**
 * 아이디어스 카테고리 URL 생성
 */
function generateIdusCategoryUrl(categoryName: string): string {
  const categoryId = CATEGORY_ID_MAP[categoryName]
  if (categoryId) {
    return `https://www.idus.com/v2/category/${categoryId}`
  }
  return generateIdusSearchUrl(categoryName)
}

/**
 * 조합 검색 URL 생성 (컬러 + 소재)
 */
function generateCombinedSearchUrl(color?: string, material?: string): string {
  const searchTerms: string[] = []
  
  if (color) {
    const colorKeyword = COLOR_SEARCH_MAP[color] || findColorSearchKeyword(color)
    if (colorKeyword) searchTerms.push(colorKeyword)
  }
  if (material) {
    const materialKeyword = MATERIAL_SEARCH_MAP[material] || findMaterialSearchKeyword(material)
    if (materialKeyword) searchTerms.push(materialKeyword)
  }
  
  if (searchTerms.length > 0) {
    return `https://www.idus.com/v2/search?keyword=${encodeURIComponent(searchTerms.join(' '))}&sort=popular`
  }
  
  return 'https://www.idus.com/v2/search?keyword=핸드메이드&sort=popular'
}

/**
 * 컬러 키워드로 검색 키워드 찾기
 */
function findColorSearchKeyword(colorName: string): string {
  const color = keywords.colors.find(c => c.name === colorName)
  return color?.searchKeyword || COLOR_SEARCH_MAP[colorName] || colorName
}

/**
 * 소재 키워드로 검색 키워드 찾기
 */
function findMaterialSearchKeyword(materialName: string): string {
  const material = keywords.materials.find(m => m.name === materialName)
  return material?.searchKeyword || MATERIAL_SEARCH_MAP[materialName] || materialName
}

/**
 * 카테고리로 URL 찾기
 */
function findCategoryUrl(categoryName: string): string {
  const category = keywords.categories.find(c => c.name === categoryName)
  return category?.categoryUrl || generateIdusCategoryUrl(categoryName)
}

/**
 * 추천 아이템 조회 - 실제 아이디어스 조합 검색 URL 포함
 */
export function getRecommendedItems(params: RecommendParams): RecommendedItem[] {
  const { color, material, category, limit = 3 } = params
  
  // 검색 키워드 추출
  const colorKeyword = color ? findColorSearchKeyword(color) : ''
  const materialKeyword = material ? findMaterialSearchKeyword(material) : ''
  
  // 조합 검색 URL 생성
  const combinedSearchUrl = generateCombinedSearchUrl(color, material)
  
  const scoredItems = items.items.map((item) => {
    let matchScore = 50
    const matchReasons: string[] = []
    const matchedKeywords: string[] = []
    
    // 컬러 매칭
    if (color && item.tags.some(tag => 
      tag.toLowerCase().includes(color.toLowerCase()) || 
      color.toLowerCase().includes(tag.toLowerCase()) ||
      (colorKeyword && tag.toLowerCase().includes(colorKeyword.toLowerCase()))
    )) {
      matchScore += 20
      matchReasons.push('오늘의 컬러 매칭')
      if (colorKeyword) matchedKeywords.push(colorKeyword)
    }
    
    // 소재 매칭
    if (material && item.tags.some(tag => 
      tag.toLowerCase().includes(material.toLowerCase()) ||
      material.toLowerCase().includes(tag.toLowerCase()) ||
      (materialKeyword && tag.toLowerCase().includes(materialKeyword.toLowerCase()))
    )) {
      matchScore += 25
      matchReasons.push('끌리는 소재 매칭')
      if (materialKeyword) matchedKeywords.push(materialKeyword)
    }
    
    // 카테고리 매칭
    if (category && item.category.toLowerCase().includes(category.toLowerCase())) {
      matchScore += 15
      matchReasons.push('취향 카테고리 매칭')
    }
    
    // 매칭 이유가 없으면 기본 이유 추가
    if (matchReasons.length === 0) {
      matchReasons.push('오늘의 추천 작품')
    }

    // 검색 URL 생성 - 매칭된 키워드 조합 사용
    let searchUrl: string
    if (matchedKeywords.length > 0) {
      // 매칭된 키워드로 검색
      searchUrl = `https://www.idus.com/v2/search?keyword=${encodeURIComponent(matchedKeywords.join(' '))}&sort=popular`
    } else if (matchReasons.includes('취향 카테고리 매칭') && category) {
      // 카테고리 URL
      searchUrl = findCategoryUrl(category)
    } else {
      // 기본 조합 검색
      searchUrl = combinedSearchUrl
    }
    
    return {
      id: item.id,
      name: item.name,
      artist: item.artist,
      price: item.price,
      originalPrice: item.originalPrice,
      discountRate: item.discountRate,
      image: item.image,
      tags: item.tags,
      category: item.category,
      matchScore: Math.min(100, matchScore),
      matchReasons,
      searchUrl,
      productUrl: searchUrl,
    }
  })
  
  // 매칭 점수로 정렬하고 상위 N개 반환
  return scoredItems
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit)
}

/**
 * 오늘의 행운 아이템 - 키워드 조합 검색 URL
 */
export function getLuckyItem(luckyKeywords: LuckyKeywords): RecommendedItem | null {
  const { color, material, category } = luckyKeywords
  
  // 조합 검색 URL
  const combinedSearchUrl = generateCombinedSearchUrl(color?.value, material?.value)

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
  
  // 조합 검색 URL
  urls.combinedSearch = generateCombinedSearchUrl(
    luckyKeywords.color?.value, 
    luckyKeywords.material?.value
  )
  
  return urls
}
