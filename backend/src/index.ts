import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import fortuneRouter from './routes/fortune.js'
import itemsRouter from './routes/items.js'

const app = express()
const PORT = process.env.PORT || 3001

// 미들웨어
app.use(helmet())
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://idus-fortune.vercel.app',
    'https://www.idus.com',
  ],
  credentials: true,
}))
app.use(express.json())

// 헬스체크
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API 라우트
app.use('/api/fortune', fortuneRouter)
app.use('/api/items', itemsRouter)

// 에러 핸들러
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message)
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: '서버 오류가 발생했습니다',
    },
  })
})

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: '요청한 리소스를 찾을 수 없습니다',
    },
  })
})

app.listen(PORT, () => {
  console.log(`🔮 Fortune API Server running on port ${PORT}`)
  console.log(`   Health check: http://localhost:${PORT}/health`)
})
