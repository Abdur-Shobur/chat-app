/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
// import { errorlogger, logger } from './shared/logger'

process.on('uncaughtException', _error => {
  // errorlogger.error(error)
  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      console.log('Application  listening on port ', config.port)
      // logger.info(`Application  listening on port ${config.port}`)
    })

    server.requestTimeout = 10000
    server.timeout = 10000
  } catch (err) {
    // errorlogger.error('Failed to connect database', err)
  }

  process.on('unhandledRejection', _error => {
    if (server) {
      server.close(() => {
        // errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  // logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
