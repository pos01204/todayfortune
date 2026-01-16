'use client'

import { motion } from 'framer-motion'

interface ScoreBarProps {
  label: string
  score: number
  icon: string
  delay?: number
}

export default function ScoreBar({ label, score, icon, delay = 0 }: ScoreBarProps) {
  // 점수에 따른 그라데이션
  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-idus-orange to-accent-coral'
    if (score >= 70) return 'from-accent-coral to-accent-peach'
    if (score >= 50) return 'from-accent-gold to-amber-300'
    return 'from-gray-300 to-gray-400'
  }

  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-sm text-gray-600 flex items-center gap-1.5 flex-shrink-0">
        <span className="text-base">{icon}</span>
        {label}
      </span>
      
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ 
            duration: 1,
            delay: delay + 0.5,
            ease: "easeOut"
          }}
          className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(score)}`}
        />
      </div>
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1 }}
        className={`w-10 text-right text-sm font-bold flex-shrink-0 ${
          score >= 90 ? 'text-idus-orange' : 
          score >= 70 ? 'text-accent-coral' : 
          'text-gray-500'
        }`}
      >
        {score}
      </motion.span>
    </div>
  )
}
