'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface LoadingScreenProps {
  message?: string
  subMessage?: string
}

const BRAND_SNIPPETS = [
  '아이디어스에는 3만 명 이상의 작가가 있어요',
  '정성 담긴 작품이 당신의 취향을 기다리고 있어요',
  '오늘의 키워드는 자정에 새로 바뀌어요',
]

export default function LoadingScreen({
  message = '취향을 찾고 있어요...',
  subMessage = '정성을 모아 오늘의 작품을 준비 중이에요',
}: LoadingScreenProps) {
  const [snippetIndex, setSnippetIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSnippetIndex((prev) => (prev + 1) % BRAND_SNIPPETS.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
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
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-gray-700 text-sm mb-2"
      >
        {message}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="text-gray-400 text-xs text-center mb-4"
      >
        {subMessage}
      </motion.p>
      <motion.div
        key={snippetIndex}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xs text-gray-500 bg-cream-warm px-4 py-2 rounded-full"
      >
        💡 {BRAND_SNIPPETS[snippetIndex]}
      </motion.div>
    </div>
  )
}
