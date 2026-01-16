'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { FortuneResult } from '@/types'

interface ShareCardProps {
  fortune: FortuneResult
  onClose: () => void
}

export default function ShareCard({ fortune, onClose }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // 클립보드 복사
  const handleCopyLink = async () => {
    const shareText = `✨ ${fortune.userName}님의 오늘의 취향 운세

🎨 오늘의 컬러: ${fortune.luckyKeywords.color.value}
✋ 끌리는 소재: ${fortune.luckyKeywords.material.value}
💝 취향 카테고리: ${fortune.luckyKeywords.category.value}

나만의 취향을 발견해보세요!
${window.location.origin}

#아이디어스 #취향운세 #핸드메이드`

    try {
      await navigator.clipboard.writeText(shareText)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // 이미지 다운로드 (html2canvas 없이 간단 버전)
  const handleDownload = async () => {
    setIsDownloading(true)
    
    // 간단한 텍스트 파일로 다운로드 (이미지 생성은 html2canvas 필요)
    const shareText = `✨ ${fortune.userName}님의 오늘의 취향 운세 ✨

━━━━━━━━━━━━━━━━━━━━━━━

📅 ${new Date().toLocaleDateString('ko-KR')}

🎨 오늘의 컬러: ${fortune.luckyKeywords.color.value}
✋ 끌리는 소재: ${fortune.luckyKeywords.material.value}
💝 취향 카테고리: ${fortune.luckyKeywords.category.value}
🔮 행운의 숫자: ${fortune.luckyKeywords.number.value}
🧭 좋은 방향: ${fortune.luckyKeywords.direction.value}

━━━━━━━━━━━━━━━━━━━━━━━

📊 오늘의 취향 점수
🎨 창작 에너지: ${fortune.scores.creativity.score}점
🎁 선물 운: ${fortune.scores.gift.score}점
🔍 발견 운: ${fortune.scores.discovery.score}점
💕 인연 운: ${fortune.scores.connection.score}점
✨ 영감 지수: ${fortune.scores.inspiration.score}점

━━━━━━━━━━━━━━━━━━━━━━━

💬 오늘의 메시지
"${fortune.message}"

━━━━━━━━━━━━━━━━━━━━━━━

🧡 아이디어스에서 나만의 취향 발견하기
${window.location.origin}

#아이디어스 #취향운세 #핸드메이드`

    const blob = new Blob([shareText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `취향운세_${fortune.userName}_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsDownloading(false)
  }

  // 카카오톡 공유 (Kakao SDK 필요 - 여기서는 링크 공유로 대체)
  const handleKakaoShare = () => {
    const shareUrl = `https://sharer.kakao.com/talk/friends/picker/link?app_key=YOUR_KAKAO_KEY&request_url=${encodeURIComponent(window.location.href)}`
    // 카카오 SDK가 없으면 일반 공유로 대체
    if (navigator.share) {
      navigator.share({
        title: '오늘의 취향 운세 | 아이디어스',
        text: `✨ ${fortune.userName}님의 취향 운세를 확인해보세요!`,
        url: window.location.href,
      })
    } else {
      handleCopyLink()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 공유 카드 미리보기 */}
        <div
          ref={cardRef}
          className="bg-gradient-to-br from-cream to-white p-6"
        >
          {/* 헤더 */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-1 text-accent-gold text-sm mb-2">
              <span>✦</span>
              <span>{fortune.userName}님의</span>
              <span>✦</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              오늘의 <span className="text-idus-orange">취향</span> 운세
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {new Date().toLocaleDateString('ko-KR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* 키워드 요약 */}
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div 
                  className="w-10 h-10 rounded-full mx-auto mb-1 border-2 border-gray-100"
                  style={{ backgroundColor: fortune.luckyKeywords.color.hex || '#FF7F7F' }}
                />
                <p className="text-[10px] text-gray-400">오늘의 컬러</p>
                <p className="text-xs font-semibold text-gray-700 truncate">
                  {fortune.luckyKeywords.color.value}
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full mx-auto mb-1 bg-cream-warm flex items-center justify-center text-lg">
                  ✋
                </div>
                <p className="text-[10px] text-gray-400">끌리는 소재</p>
                <p className="text-xs font-semibold text-gray-700 truncate">
                  {fortune.luckyKeywords.material.value}
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full mx-auto mb-1 bg-cream-warm flex items-center justify-center text-lg">
                  💝
                </div>
                <p className="text-[10px] text-gray-400">취향 카테고리</p>
                <p className="text-xs font-semibold text-gray-700 truncate">
                  {fortune.luckyKeywords.category.value}
                </p>
              </div>
            </div>
          </div>

          {/* 점수 요약 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center">
              {Object.entries(fortune.scores).slice(0, 3).map(([key, score]) => (
                <div key={key} className="text-center">
                  <div className="text-lg mb-0.5">{score.icon}</div>
                  <div className="text-xs text-gray-400">{score.label}</div>
                  <div className={`text-sm font-bold ${
                    score.score >= 90 ? 'text-idus-orange' : 
                    score.score >= 70 ? 'text-accent-coral' : 
                    'text-gray-500'
                  }`}>
                    {score.score}점
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 브랜드 로고 */}
          <div className="mt-4 text-center">
            <Image
              src="/brand/brand assets/line_01.png"
              alt="아이디어스"
              width={60}
              height={17}
              className="mx-auto opacity-60"
            />
          </div>
        </div>

        {/* 공유 버튼들 */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center mb-3">
            친구에게 공유하면 친구도 운세를 볼 수 있어요!
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isDownloading ? '저장 중...' : '저장'}
            </button>
            
            <button
              onClick={handleKakaoShare}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#FEE500] rounded-xl text-sm font-medium text-[#3C1E1E] hover:bg-[#FDD800] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.52 1.64 4.74 4.12 6.04-.18.65-.65 2.35-.74 2.72-.12.48.17.47.37.34.15-.1 2.42-1.64 3.4-2.31.61.09 1.23.13 1.85.13 5.52 0 10-3.48 10-7.92S17.52 3 12 3z"/>
              </svg>
              카카오톡
            </button>
            
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-idus-orange text-white rounded-xl text-sm font-medium hover:bg-idus-orange/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {isCopied ? '복사됨!' : '링크 복사'}
            </button>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  )
}
