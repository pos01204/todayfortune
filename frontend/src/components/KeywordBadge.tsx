'use client'

interface KeywordBadgeProps {
  icon: string
  label: string
  value: string | number
  color?: string
  searchUrl?: string     // 아이디어스 검색 URL
  categoryUrl?: string   // 카테고리 URL
  meta?: string          // 작품 수 등 부가 정보
}

export default function KeywordBadge({ 
  icon, 
  label, 
  value, 
  color,
  searchUrl,
  categoryUrl,
  meta,
}: KeywordBadgeProps) {
  // 클릭 가능한 키워드인지 확인 (URL이 있는 경우)
  const isClickable = searchUrl || categoryUrl
  const linkUrl = categoryUrl || searchUrl

  const content = (
    <div className={`flex items-center justify-between py-3 border-b border-gray-50 last:border-0 ${
      isClickable ? 'cursor-pointer hover:bg-cream-warm rounded-lg px-2 -mx-2 transition-colors' : ''
    }`}>
      <div className="flex items-center gap-2.5">
        <span className="text-lg w-6 text-center">{icon}</span>
        <span className="text-gray-500 text-sm">{label}</span>
      </div>
      
      <div className="flex items-center gap-2">
        {meta && (
          <span className="text-xs text-gray-400">{meta}</span>
        )}
        {color && (
          <span 
            className="w-5 h-5 rounded-full border border-gray-100 shadow-sm"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="font-semibold text-gray-800">{value}</span>
        {isClickable && (
          <svg 
            className="w-4 h-4 text-idus-orange" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        )}
      </div>
    </div>
  )

  if (isClickable && linkUrl) {
    return (
      <a 
        href={linkUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    )
  }

  return content
}
