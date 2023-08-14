import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import httpStatus from 'http-status'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/v1/users', router)

// Error Handeling
app.use(globalErrorHandler)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // res.send('Hello World!')
  // throw new ApiError(500, 'Hello')
  next('bokkor')
})

// Handle NotFound
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
