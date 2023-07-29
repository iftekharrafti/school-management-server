import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/modules/user/user.route'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/v1/users', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
