import { Router, Request, Response } from 'express'
import { getRecommendedItems, getLuckyItem } from '../services/itemService.js'

const router = Router()

/**
 * GET /api/items/recommend
 * 추천 아이템 조회
 */
router.get('/recommend', async (req: Request, res: Response) => {
  try {
    const { color, material, category, limit } = req.query

    const items = getRecommendedItems({
      color: color as string,
      material: material as string,
      category: category as string,
      limit: limit ? parseInt(limit as string) : 3,
    })

    res.json({
      success: true,
      data: {
        items,
        totalCount: items.length,
        matchCriteria: { color, material, category },
      },
    })
  } catch (error) {
    console.error('Item recommendation error:', error)
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '아이템 추천 중 오류가 발생했습니다',
      },
    })
  }
})

/**
 * POST /api/items/lucky
 * 오늘의 행운 아이템 조회
 */
router.post('/lucky', async (req: Request, res: Response) => {
  try {
    const { luckyKeywords } = req.body

    if (!luckyKeywords) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_KEYWORDS',
          message: '행운 키워드가 필요합니다',
        },
      })
    }

    const luckyItem = getLuckyItem(luckyKeywords)

    res.json({
      success: true,
      data: { luckyItem },
    })
  } catch (error) {
    console.error('Lucky item error:', error)
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '행운 아이템 조회 중 오류가 발생했습니다',
      },
    })
  }
})

export default router
