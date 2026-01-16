import { Router, Request, Response } from 'express'
import { generateFortune } from '../services/fortuneService.js'

const router = Router()

/**
 * POST /api/fortune
 * 운세 생성
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { birthDate, name } = req.body

    // 유효성 검사
    if (!birthDate) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_BIRTH_DATE',
          message: '생년월일을 입력해주세요',
        },
      })
    }

    // 날짜 형식 검사
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(birthDate)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_BIRTH_DATE',
          message: '올바른 생년월일 형식이 아닙니다 (YYYY-MM-DD)',
        },
      })
    }

    // 미래 날짜 검사
    if (new Date(birthDate) > new Date()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'FUTURE_DATE',
          message: '미래 날짜는 입력할 수 없습니다',
        },
      })
    }

    const fortune = generateFortune(birthDate, name)
    
    res.json({
      success: true,
      data: fortune,
    })
  } catch (error) {
    console.error('Fortune generation error:', error)
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '운세 생성 중 오류가 발생했습니다',
      },
    })
  }
})

export default router
