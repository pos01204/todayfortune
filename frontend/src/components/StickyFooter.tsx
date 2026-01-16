'use client'

interface StickyFooterProps {
  primaryUrl: string
  primaryLabel: string
  secondaryUrl?: string
  secondaryLabel?: string
}

export default function StickyFooter({
  primaryUrl,
  primaryLabel,
  secondaryUrl,
  secondaryLabel,
}: StickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-100">
      <div className="max-w-xl mx-auto px-5 py-3 flex items-center gap-2">
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gradient-to-r from-idus-orange to-accent-coral text-white text-sm font-semibold py-3 rounded-full text-center shadow-sm active:scale-[0.99]"
        >
          {primaryLabel}
        </a>
        {secondaryUrl && secondaryLabel && (
          <a
            href={secondaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 text-sm font-semibold text-idus-orange border border-idus-orange/30 rounded-full bg-white"
          >
            {secondaryLabel}
          </a>
        )}
      </div>
    </div>
  )
}
