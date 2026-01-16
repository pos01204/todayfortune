import type { FortuneResult, RecommendedItem, LuckyKeywords, ApiResponse } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

/**
 * 아이디어스 검색 URL 생성
 */
function generateIdusSearchUrl(keyword: string): string {
  return `https://www.idus.com/v2/search?keyword=${encodeURIComponent(keyword)}`
}

/**
 * 운세 조회 API
 */
export async function fetchFortune(birthDate: string, name?: string): Promise<FortuneResult> {
  try {
    const response = await fetch(`${API_URL}/api/fortune`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ birthDate, name }),
    })

    const data: ApiResponse<FortuneResult> = await response.json()
    
    if (!data.success || !data.data) {
      throw new Error(data.error?.message || '취향을 찾는 중 문제가 발생했어요')
    }

    return data.data
  } catch (error) {
    console.error('fetchFortune error:', error)
    // 목업 데이터 반환 (개발/오프라인용)
    return getMockFortune(birthDate, name)
  }
}

/**
 * 추천 아이템 조회 API
 */
export async function fetchRecommendedItems(keywords: LuckyKeywords): Promise<RecommendedItem[]> {
  try {
    const params = new URLSearchParams({
      color: String(keywords.color.value),
      material: String(keywords.material.value),
      category: String(keywords.category.value),
      limit: '3',
    })

    const response = await fetch(`${API_URL}/api/items/recommend?${params}`)
    const data: ApiResponse<{ items: RecommendedItem[] }> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || '작품을 찾는 중 문제가 발생했어요')
    }

    return data.data.items
  } catch (error) {
    console.error('fetchRecommendedItems error:', error)
    return getMockItems(keywords)
  }
}

/**
 * 목업 운세 데이터 - 실제 아이디어스 URL 포함
 */
function getMockFortune(birthDate: string, name?: string): FortuneResult {
  const messages = [
    '오늘은 새로운 취향을 발견하기 좋은 날이에요. 평소 지나쳤던 것들 속에서 보석 같은 작품을 만나게 될지도 몰라요. 마음이 이끄는 대로 천천히 둘러보세요.',
    '창작 에너지가 가득한 하루예요. 무언가를 만들고 싶은 마음이 들지 않나요? 작가들의 작품에서 영감을 받아보세요. 당신만의 이야기가 시작될 수 있어요.',
    '소중한 사람에게 마음을 전하기 좋은 날이에요. 직접 고른 정성 담긴 선물은 어떠세요? 받는 사람의 얼굴에 피어날 미소를 상상해보세요.',
    '특별한 인연이 기다리는 날이에요. 마음에 드는 작품을 발견한다면, 그건 그 작가와의 소중한 연결의 시작일지도 몰라요.',
  ]

  // 키워드 옵션들 (실제 아이디어스 검색 키워드 포함)
  const colorOptions = [
    { name: '코랄 핑크', hex: '#FF7F7F', searchKeyword: '핑크' },
    { name: '민트 그린', hex: '#98D8C8', searchKeyword: '민트' },
    { name: '테라코타', hex: '#E2725B', searchKeyword: '테라코타' },
    { name: '크림 베이지', hex: '#F5F0E1', searchKeyword: '베이지' },
    { name: '라벤더 퍼플', hex: '#B4A7D6', searchKeyword: '라벤더' },
    { name: '인디고 블루', hex: '#4B6587', searchKeyword: '인디고' },
  ]

  const materialOptions = [
    { name: '천연 가죽', searchKeyword: '가죽' },
    { name: '스털링 실버', searchKeyword: '실버' },
    { name: '핸드메이드 도자기', searchKeyword: '도자기' },
    { name: '천연 목재', searchKeyword: '원목' },
    { name: '오가닉 코튼', searchKeyword: '면' },
    { name: '프리미엄 울', searchKeyword: '니트' },
  ]
  
  // 실제 아이디어스 카테고리 ID 기반 URL
  const categoryOptions = [
    { name: '주얼리/액세서리', searchKeyword: '주얼리', categoryUrl: 'https://www.idus.com/v2/category/1047' },
    { name: '홈리빙/인테리어', searchKeyword: '홈데코', categoryUrl: 'https://www.idus.com/v2/category/1049' },
    { name: '패션/잡화', searchKeyword: '패션잡화', categoryUrl: 'https://www.idus.com/v2/category/1048' },
    { name: '케이스/문구', searchKeyword: '문구', categoryUrl: 'https://www.idus.com/v2/category/1050' },
    { name: '식품/디저트', searchKeyword: '디저트', categoryUrl: 'https://www.idus.com/v2/category/1046' },
  ]
  
  const directions = ['동쪽', '서쪽', '남쪽', '북쪽']

  const seed = birthDate.split('-').reduce((acc, val) => acc + parseInt(val), 0) + new Date().getDate()
  
  const randomIndex = <T,>(arr: T[]) => arr[seed % arr.length]
  const randomScore = (base: number) => Math.min(100, Math.max(55, base + (seed % 30)))

  const selectedColor = randomIndex(colorOptions)
  const selectedMaterial = randomIndex(materialOptions)
  const selectedCategory = randomIndex(categoryOptions)

  return {
    id: `fortune_${new Date().toISOString().split('T')[0]}_${Math.random().toString(36).substring(7)}`,
    userName: name || '회원',
    message: randomIndex(messages),
    scores: {
      creativity: { label: '창작 에너지', score: randomScore(75), icon: '🎨' },
      gift: { label: '선물 운', score: randomScore(70), icon: '🎁' },
      discovery: { label: '발견 운', score: randomScore(80), icon: '🔍' },
      connection: { label: '인연 운', score: randomScore(65), icon: '💕' },
      inspiration: { label: '영감 지수', score: randomScore(85), icon: '✨' },
    },
    luckyKeywords: {
      number: { 
        label: '행운의 숫자', 
        value: (seed % 9) + 1, 
        icon: '🔮' 
      },
      direction: { 
        label: '좋은 방향', 
        value: randomIndex(directions), 
        icon: '🧭' 
      },
      color: { 
        label: '오늘의 컬러', 
        value: selectedColor.name, 
        hex: selectedColor.hex, 
        icon: '🎨',
        searchUrl: generateIdusSearchUrl(selectedColor.searchKeyword)
      },
      material: { 
        label: '끌리는 소재', 
        value: selectedMaterial.name, 
        icon: '✋',
        searchUrl: generateIdusSearchUrl(selectedMaterial.searchKeyword)
      },
      category: { 
        label: '취향 카테고리', 
        value: selectedCategory.name, 
        icon: '💝',
        searchUrl: generateIdusSearchUrl(selectedCategory.searchKeyword),
        categoryUrl: selectedCategory.categoryUrl
      },
    },
    zodiac: {
      animal: '용',
      emoji: '🐲',
      year: parseInt(birthDate.split('-')[0]),
    },
    constellation: {
      name: '물병자리',
      emoji: '♒',
      period: '1/20 - 2/18',
    },
    generatedAt: new Date().toISOString(),
  }
}

/**
 * 목업 추천 아이템 - 실제 아이디어스 검색 URL
 */
function getMockItems(keywords: LuckyKeywords): RecommendedItem[] {
  // 키워드에서 검색어 추출
  const colorValue = String(keywords.color?.value || '')
  const materialValue = String(keywords.material?.value || '')
  
  // 검색 키워드 매핑
  const searchKeywordMap: Record<string, string> = {
    '코랄 핑크': '핑크',
    '민트 그린': '민트',
    '테라코타': '테라코타',
    '크림 베이지': '베이지',
    '라벤더 퍼플': '라벤더',
    '인디고 블루': '인디고',
    '천연 가죽': '가죽',
    '스털링 실버': '실버',
    '핸드메이드 도자기': '도자기',
    '천연 목재': '원목',
    '오가닉 코튼': '면',
    '프리미엄 울': '니트',
  }

  const colorKeyword = searchKeywordMap[colorValue] || colorValue
  const materialKeyword = searchKeywordMap[materialValue] || materialValue

  return [
    {
      id: 1,
      name: `${materialValue} 작품 컬렉션`,
      artist: { id: 1, name: '아이디어스 작가' },
      price: 35000,
      originalPrice: 42000,
      discountRate: 17,
      image: '/brand/brand assets/가방.png',
      tags: [materialKeyword, '핸드메이드'],
      category: String(keywords.category?.value || ''),
      matchScore: 95,
      matchReasons: ['끌리는 소재 매칭', '취향 카테고리 매칭'],
      productUrl: generateIdusSearchUrl(`${materialKeyword} ${colorKeyword}`),
      searchUrl: generateIdusSearchUrl(`${materialKeyword} ${colorKeyword}`),
    },
    {
      id: 2,
      name: `${colorValue} 컬러 작품`,
      artist: { id: 2, name: '아이디어스 작가' },
      price: 48000,
      image: '/brand/brand assets/주얼리_목걸이.png',
      tags: [colorKeyword, '액세서리'],
      category: '주얼리/액세서리',
      matchScore: 88,
      matchReasons: ['오늘의 컬러 매칭'],
      productUrl: generateIdusSearchUrl(colorKeyword),
      searchUrl: generateIdusSearchUrl(colorKeyword),
    },
    {
      id: 3,
      name: '오늘의 추천 작품',
      artist: { id: 3, name: '아이디어스 작가' },
      price: 28000,
      image: '/brand/brand assets/캔들.png',
      tags: ['홈데코', '선물'],
      category: '홈리빙/인테리어',
      matchScore: 72,
      matchReasons: ['오늘의 추천 작품'],
      productUrl: generateIdusSearchUrl('핸드메이드 선물'),
      searchUrl: generateIdusSearchUrl('핸드메이드 선물'),
    },
  ]
}
