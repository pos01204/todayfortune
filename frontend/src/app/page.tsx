'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const [birthDate, setBirthDate] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const eventYear = new Date().getFullYear()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!birthDate) {
      setError('생년월일을 입력해주세요')
      return
    }

    setIsLoading(true)
    
    const params = new URLSearchParams({
      birthDate,
      ...(name && { name }),
    })
    
    router.push(`/result?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-idus-orange/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-peach/20 rounded-full blur-3xl" />
      </div>

      {/* 별 장식 */}
      <motion.div 
        className="absolute top-16 left-6 text-accent-gold text-lg"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✦
      </motion.div>
      <motion.div 
        className="absolute top-32 right-8 text-accent-gold text-sm"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        ✦
      </motion.div>
      <motion.div 
        className="absolute bottom-40 left-10 text-accent-gold text-base"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        ✦
      </motion.div>
      
      <div className="relative z-10 px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          {/* 로고 */}
          <div className="mb-6">
            <Image
              src="/brand/brand assets/line_01.png"
              alt="아이디어스"
              width={100}
              height={28}
              className="mx-auto"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm">
            <span className="text-accent-gold">✦</span>
            <span className="text-sm font-medium text-gray-600">{eventYear} 새해 특별 이벤트</span>
            <span className="text-accent-gold">✦</span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            오늘, 당신의 취향이<br />이끄는 곳은?
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            나만의 취향을 발견하고<br />
            정성 담긴 작품을 만나보세요
          </p>
        </motion.div>

        {/* 메인 카드 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-3xl p-8 shadow-idus">
            {/* 일러스트 */}
            <motion.div 
              className="text-center mb-6"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/loading/3times.gif"
                alt="선물상자"
                width={120}
                height={120}
                className="mx-auto"
                unoptimized
              />
            </motion.div>

            <h2 className="text-lg font-bold text-center text-gray-800 mb-2">
              취향 여정을 시작해볼까요?
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              생년월일로 오늘의 취향을 발견해보세요
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 이름 입력 (선택) */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  닉네임 <span className="text-gray-400">(선택)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="어떻게 불러드릴까요?"
                  className="input-field"
                  maxLength={10}
                />
              </div>

              {/* 생년월일 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  생년월일 <span className="text-idus-orange">*</span>
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="input-field"
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* 제출 버튼 */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    취향을 찾는 중...
                  </span>
                ) : (
                  <>
                    나의 취향 발견하기
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* 하단 설명 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-400 leading-relaxed">
            아이디어스는 작가와 고객의 취향을 연결하는<br />
            핸드메이드 라이프스타일 플랫폼입니다
          </p>
        </motion.div>
      </div>
    </div>
  )
}
