import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 아이디어스 브랜드 컬러
        idus: {
          orange: '#FF6B35',
          'orange-90': 'rgba(255, 107, 53, 0.9)',
          'orange-70': 'rgba(255, 107, 53, 0.7)',
          'orange-50': 'rgba(255, 107, 53, 0.5)',
          'orange-30': 'rgba(255, 107, 53, 0.3)',
          'orange-10': 'rgba(255, 107, 53, 0.1)',
        },
        cream: {
          DEFAULT: '#FFF9F5',
          warm: '#FFF5EB',
          soft: '#FFFBF7',
        },
        accent: {
          coral: '#FF8A65',
          peach: '#FFCCBC',
          gold: '#FFB74D',
        },
      },
      fontFamily: {
        suite: ['SUITE', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fortune-reveal': 'fortuneReveal 0.8s ease-out forwards',
        'score-fill': 'scoreFill 1s ease-out forwards',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'gift-bounce': 'giftBounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fortuneReveal: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scoreFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--score-width)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1) rotate(5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        giftBounce: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'idus': '0 4px 24px rgba(255, 107, 53, 0.08)',
        'idus-hover': '0 8px 32px rgba(255, 107, 53, 0.12)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
export default config
