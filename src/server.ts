import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  errorLogger.error(err)
  process.exit(1)
})

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database is connected successfully')

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }

  process.on('unhandledRejection', err => {
    // asynchronous er khetre kaj kore...
    console.log('Unhandled rejection is detected, we are closing our server...')
    if (server) {
      server.close(() => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
