'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ScoreBarProps {
  label: string
  score: number
  icon: string
  delay?: number
}

export default function ScoreBar({ label, score, icon, delay = 0 }: ScoreBarProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const motionValue = useMotionValue(0)

  // 점수 카운트업 애니메이션
  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(motionValue, score, {
        duration: 1.2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayScore(Math.round(latest))
        },
      })
      return () => controls.stop()
    }, (delay + 0.5) * 1000)

    return () => clearTimeout(timeout)
  }, [score, delay, motionValue])

  // 점수에 따른 그라데이션
  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-idus-orange to-accent-coral'
    if (score >= 70) return 'from-accent-coral to-accent-peach'
    if (score >= 50) return 'from-accent-gold to-amber-300'
    return 'from-gray-300 to-gray-400'
  }

  // 점수에 따른 텍스트 색상
  const getScoreTextColor = (score: number) => {
    if (score >= 90) return 'text-idus-orange'
    if (score >= 70) return 'text-accent-coral'
    return 'text-gray-500'
  }

  // 점수에 따른 이모지 뱃지
  const getScoreBadge = (score: number) => {
    if (score >= 95) return '🔥'
    if (score >= 90) return '✨'
    if (score >= 80) return '💫'
    return null
  }

  const badge = getScoreBadge(score)

  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-sm text-gray-600 flex items-center gap-1.5 flex-shrink-0">
        <span className="text-base">{icon}</span>
        {label}
      </span>
      
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ 
            duration: 1.2,
            delay: delay + 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(score)} relative`}
        >
          {/* 반짝이 효과 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: [0, 1, 0], x: 100 }}
            transition={{
              duration: 0.8,
              delay: delay + 1.2,
              ease: 'easeOut',
            }}
            className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: delay + 1,
          type: 'spring',
          stiffness: 200,
        }}
        className={`w-12 text-right text-sm font-bold flex-shrink-0 flex items-center justify-end gap-0.5 ${getScoreTextColor(score)}`}
      >
        {badge && <span className="text-xs">{badge}</span>}
        <span>{displayScore}</span>
      </motion.div>
    </div>
  )
}
