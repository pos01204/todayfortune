/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.idus.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  // 브랜드 에셋 폴더를 public처럼 사용
  async rewrites() {
    return [
      {
        source: '/brand/:path*',
        destination: '/brand/:path*',
      },
      {
        source: '/fonts/:path*',
        destination: '/fonts/:path*',
      },
      {
        source: '/loading/:path*',
        destination: '/loading/:path*',
      },
    ]
  },
}

module.exports = nextConfig
