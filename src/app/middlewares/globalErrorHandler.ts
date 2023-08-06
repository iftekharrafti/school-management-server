/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessages } from '../../interfaces/error'
import ApiError from '../../error/ApiError'
import handleValidationError from '../../error/handleValidationError'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'development'
    ? console.log('globalErrorHandler ~~~', err)
    : errorLogger.error(console.log('globalErrorHandler ~~~', err))
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessages[] = []

  if (err?.name === 'ValidationError') {
    //
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof Error) {
    /****** Custom Error ******/
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof ApiError) {
    /****** Api Error ******/
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
