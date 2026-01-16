import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '오늘의 취향 운세 | 아이디어스',
  description: '오늘 당신의 취향이 이끄는 곳은 어디일까요? 나만의 취향을 발견하고, 정성 담긴 작품을 만나보세요.',
  keywords: ['아이디어스', '운세', '취향', '핸드메이드', '작품', '선물'],
  openGraph: {
    title: '오늘의 취향 운세 | 아이디어스',
    description: '오늘 당신의 취향이 이끄는 곳은 어디일까요? 나만의 취향을 발견하고, 정성 담긴 작품을 만나보세요.',
    images: ['/og-image.png'],
    siteName: '아이디어스',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '오늘의 취향 운세 | 아이디어스',
    description: '나만의 취향을 발견하는 여정',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#FF6B35',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-cream font-suite min-h-screen antialiased">
        <main className="max-w-md mx-auto min-h-screen relative">
          {children}
        </main>
      </body>
    </html>
  )
}
