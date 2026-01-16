'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ScoreBar from '@/components/ScoreBar'
import KeywordBadge from '@/components/KeywordBadge'
import ItemCard from '@/components/ItemCard'
import { fetchFortune, fetchRecommendedItems } from '@/lib/api'
import type { FortuneResult, RecommendedItem } from '@/types'

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6"
      >
        <Image
          src="/loading/3times.gif"
          alt="로딩 중"
          width={100}
          height={100}
          unoptimized
        />
      </motion.div>
      <p className="text-gray-500 text-sm">취향을 찾고 있어요...</p>
    </div>
  )
}

function ResultContent() {
  const searchParams = useSearchParams()
  const [fortune, setFortune] = useState<FortuneResult | null>(null)
  const [items, setItems] = useState<RecommendedItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const birthDate = searchParams.get('birthDate')
  const name = searchParams.get('name') || '회원'

  useEffect(() => {
    const loadFortune = async () => {
      if (!birthDate) {
        setError('생년월일 정보가 필요합니다')
        setIsLoading(false)
        return
      }

      try {
        const fortuneData = await fetchFortune(birthDate, name)
        setFortune(fortuneData)
        
        const itemsData = await fetchRecommendedItems(fortuneData.luckyKeywords)
        setItems(itemsData)
      } catch (err) {
        console.error('Failed to load fortune:', err)
        setError('취향을 찾는 중 문제가 발생했어요')
      } finally {
        setIsLoading(false)
      }
    }

    loadFortune()
  }, [birthDate, name])

  const handleShare = async () => {
    const shareText = `✨ ${name}님의 오늘의 취향 운세\n\n오늘의 컬러: ${fortune?.luckyKeywords.color.value}\n끌리는 소재: ${fortune?.luckyKeywords.material.value}\n취향 카테고리: ${fortune?.luckyKeywords.category.value}\n\n나만의 취향을 발견해보세요!`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '오늘의 취향 운세 | 아이디어스',
          text: shareText,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`)
      alert('링크가 복사되었습니다!')
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (error || !fortune) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
        <Image
          src="/brand/brand assets/슬퍼요.png"
          alt="오류"
          width={80}
          height={80}
          className="mb-4"
        />
        <p className="text-gray-600 mb-4 text-center">{error}</p>
        <a 
          href="/" 
          className="text-idus-orange font-semibold flex items-center gap-1"
        >
          다시 시도하기
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pb-10">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-idus-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-accent-peach/20 rounded-full blur-3xl" />
      </div>

      {/* 별 장식 */}
      <motion.div 
        className="absolute top-20 left-8 text-accent-gold"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✦
      </motion.div>
      <motion.div 
        className="absolute top-40 right-6 text-accent-gold text-sm"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
      >
        ✦
      </motion.div>
      
      <div className="relative z-10 px-5 py-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <p className="text-sm text-gray-500 mb-1">✦ {name}님의 ✦</p>
          <h1 className="text-2xl font-bold">
            <span className="text-idus-orange">오늘의 취향</span> 운세
          </h1>
        </motion.div>

        {/* 메인 일러스트 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <Image
              src="/brand/brand assets/선물.png"
              alt="선물"
              width={140}
              height={140}
              className="float"
            />
            <motion.span 
              className="absolute -top-2 -right-2 text-accent-gold"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✦
            </motion.span>
            <motion.span 
              className="absolute top-4 -left-4 text-accent-gold text-sm"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              ✦
            </motion.span>
          </div>
        </motion.div>

        {/* 취향 메시지 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-idus mb-5"
        >
          <p className="text-gray-700 leading-relaxed text-base mb-6">
            {fortune.message}
          </p>

          {/* 취향 점수 */}
          <div className="space-y-3">
            {Object.entries(fortune.scores).map(([key, score], index) => (
              <ScoreBar 
                key={key}
                label={score.label}
                score={score.score}
                icon={score.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* 취향 키워드 카드 - 클릭하면 아이디어스로 이동 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-6 shadow-idus mb-5"
        >
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span className="text-lg">✨</span>
            오늘의 취향 키워드
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            키워드를 클릭하면 아이디어스에서 관련 작품을 볼 수 있어요
          </p>
          <div className="space-y-1">
            {Object.entries(fortune.luckyKeywords).map(([key, keyword]) => (
              <KeywordBadge 
                key={key}
                icon={keyword.icon}
                label={keyword.label}
                value={keyword.value}
                color={keyword.hex}
                searchUrl={keyword.searchUrl}
                categoryUrl={keyword.categoryUrl}
              />
            ))}
          </div>
        </motion.div>

        {/* 오늘의 취향 작품 - 실제 아이디어스 연결 */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-3xl p-6 shadow-idus mb-6"
          >
            <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <Image
                src="/brand/brand assets/좋아요.png"
                alt=""
                width={24}
                height={24}
              />
              오늘의 취향에 어울리는 작품
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              작가의 정성이 담긴 특별한 작품들을 만나보세요
            </p>
            
            <div className="space-y-3">
              {items.map((item, index) => (
                <ItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
            
            {/* 카테고리 바로가기 - 인기순 정렬 */}
            {fortune.luckyKeywords.category.categoryUrl && (
              <a
                href={`${fortune.luckyKeywords.category.categoryUrl}?sort=popular`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 text-sm text-white font-medium py-3 bg-gradient-to-r from-idus-orange to-accent-coral rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <span>{fortune.luckyKeywords.category.value}</span>
                <span>작품 더 보기</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            )}
          </motion.div>
        )}

        {/* 공유 버튼 */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold py-4 rounded-full shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          내 취향 운세 공유하기
        </motion.button>

        {/* 다시하기 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-4 text-center"
        >
          <a
            href="/"
            className="inline-flex items-center gap-1 text-gray-400 text-sm hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            다시 해보기
          </a>
        </motion.div>

        {/* 하단 로고 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <a 
            href="https://www.idus.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Image
              src="/brand/brand assets/line_01.png"
              alt="아이디어스"
              width={80}
              height={22}
              className="mx-auto opacity-50 hover:opacity-100 transition-opacity"
            />
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ResultContent />
    </Suspense>
  )
}
