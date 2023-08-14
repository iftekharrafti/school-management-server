import { Response } from 'express'

const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number
    success: boolean
    message?: string
    meta?: {
      page?: number | undefined
      limit?: number | undefined
      total?: number | undefined
    }
    data: T | null
  },
): void => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta || null,
    data: data.data,
  })
}

export default sendResponse
