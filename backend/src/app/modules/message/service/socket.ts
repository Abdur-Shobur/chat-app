import { Server, Socket } from 'socket.io'
import MessageModel from '../message.model'
import { MessageType } from '../message.interface'
const handleMessageEvents = (io: Server): void => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id)

    socket.on('getMessages', async (userId: string) => {
      try {
        const messages = await MessageModel.find({ sender: userId })
        socket.emit('messages', messages)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    })

    // Listen for a message from a client
    socket.on('sendMessage', async (message: MessageType) => {
      try {
        // Store the message in the database
        const savedMessage = await MessageModel.create(message)

        // Emit the message to the receiver
        io.to(message.receiver.toString()).emit('receiveMessage', savedMessage)
      } catch (error) {
        console.error('Error saving message:', error)
      }
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })
}

export default handleMessageEvents
