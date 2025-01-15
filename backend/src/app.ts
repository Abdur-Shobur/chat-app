import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import http from 'http'
import handleMessageEvents from './app/modules/message/service/socket'
import { Server as WebSocketServer } from 'socket.io'
import sockets from './app/modules/sockets'
import config from './config'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// routes
app.use('/api/v1', routes)
// const server = http.createServer(app)
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:4000', // Replace with your frontend URL
//     methods: ['GET', 'POST'],
//   },
// })

//  io.on('connection', socket => {
//   console.log('A user connected:', socket.id)

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id)
//   })
// })

// handleMessageEvents(io)

//global error handler
app.use(globalErrorHandler)

app.get('/', (_req, res) => {
  res.send('app is running')
})

//handle not found
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
