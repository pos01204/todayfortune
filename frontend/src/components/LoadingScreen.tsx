'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface LoadingScreenProps {
  message?: string
  subMessage?: string
}

export default function LoadingScreen({
  message = '취향을 찾고 있어요...',
  subMessage = '정성을 모아 오늘의 작품을 준비 중이에요',
}: LoadingScreenProps) {
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
        className="text-gray-600 text-sm mb-2"
      >
        {message}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="text-gray-400 text-xs text-center"
      >
        {subMessage}
      </motion.p>
    </div>
  )
}
