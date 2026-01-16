'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { RecommendedItem } from '@/types'

interface ItemCardProps {
  item: RecommendedItem
  index: number
}

// 카테고리별 일러스트 매핑
const categoryIllustrations: Record<string, string> = {
  '액세서리': '/brand/brand assets/주얼리_목걸이.png',
  '주얼리': '/brand/brand assets/주얼리_목걸이.png',
  '홈리빙': '/brand/brand assets/캔들.png',
  '홈데코': '/brand/brand assets/캔들.png',
  '패션': '/brand/brand assets/가방.png',
  '잡화': '/brand/brand assets/가방.png',
  '문구': '/brand/brand assets/문구사무용품.png',
  '다이어리': '/brand/brand assets/문구사무용품.png',
  '푸드': '/brand/brand assets/디저트.png',
  '디저트': '/brand/brand assets/디저트.png',
  '베이커리': '/brand/brand assets/디저트.png',
  '아트': '/brand/brand assets/미술.png',
  '일러스트': '/brand/brand assets/미술.png',
  '반려동물': '/brand/brand assets/캔들.png',
  '뷰티': '/brand/brand assets/뷰티.png',
  '향기': '/brand/brand assets/캔들.png',
  '플랜트': '/brand/brand assets/플랜트.png',
}

export default function ItemCard({ item, index }: ItemCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR')
  }

  // 카테고리에 맞는 일러스트 찾기
  const getIllustration = () => {
    if (item.category) {
      for (const [keyword, path] of Object.entries(categoryIllustrations)) {
        if (item.category.includes(keyword)) {
          return path
        }
      }
    }
    
    // 태그에서 찾기
    if (item.tags) {
      for (const tag of item.tags) {
        for (const [keyword, path] of Object.entries(categoryIllustrations)) {
          if (tag.includes(keyword)) {
            return path
          }
        }
      }
    }
    
    return '/brand/brand assets/선물.png'
  }

  // 실제 아이디어스 URL 사용
  const itemUrl = item.searchUrl || item.productUrl

  return (
    <motion.a
      href={itemUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      className="flex gap-4 p-3 bg-cream rounded-2xl hover:bg-cream-warm transition-all group hover:shadow-sm"
    >
      {/* 이미지 */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-cream-warm to-accent-peach/30 flex-shrink-0 flex items-center justify-center relative">
        <Image
          src={getIllustration()}
          alt={item.name}
          width={50}
          height={50}
          className="object-contain group-hover:scale-110 transition-transform"
        />
        
        {/* 매칭 뱃지 */}
        {item.matchScore >= 90 && (
          <div className="absolute top-1 left-1 bg-idus-orange text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
            BEST
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h4 className="font-medium text-gray-800 text-sm truncate mb-0.5 group-hover:text-idus-orange transition-colors">
          {item.name}
        </h4>
        <p className="text-xs text-gray-400 mb-1.5">
          {item.artist.name} 작가
        </p>
        
        <div className="flex items-center gap-2">
          {item.discountRate && item.discountRate > 0 && (
            <span className="text-idus-orange font-bold text-sm">
              {item.discountRate}%
            </span>
          )}
          <span className="font-bold text-gray-800 text-sm">
            {formatPrice(item.price)}원
          </span>
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-xs text-gray-300 line-through">
              {formatPrice(item.originalPrice)}
            </span>
          )}
        </div>

        {/* 매칭 이유 태그 */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {item.matchReasons.slice(0, 2).map((reason, i) => (
            <span 
              key={i}
              className="text-[10px] bg-idus-orange/10 text-idus-orange px-2 py-0.5 rounded-full"
            >
              {reason}
            </span>
          ))}
        </div>
      </div>

      {/* 아이디어스 연결 표시 */}
      <div className="flex items-center">
        <div className="flex flex-col items-center gap-1 text-gray-300 group-hover:text-idus-orange transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span className="text-[8px] font-medium">아이디어스</span>
        </div>
      </div>
    </motion.a>
  )
}
