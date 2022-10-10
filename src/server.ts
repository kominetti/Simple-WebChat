import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const server = express()
server.use(express.static('public'))
server.get('./', (req, res) => res.sendFile(__dirname + 'index.html'))

const httpServer = http.createServer(server)
httpServer.listen(3000)

const io = new Server(httpServer)

const messageList: string[] = []
io.on('connection', (socket) => {

    socket.on('sendMessage', (message) => {
      messageList.push(message)
      console.log(messageList)
      io.emit('getMessage', messageList)
    })

})