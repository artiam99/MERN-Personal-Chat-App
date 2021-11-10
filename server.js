const express = require('express')
const app = express()
const server = require('http').Server(app)

const io = require('socket.io')(server)

const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

require('dotenv').config({ path: './config.env' })

const connectDb = require('./utilsServer/connectDb')
connectDb()

app.use(express.json())

const { addUser, removeUser, findConnectedUser } = require('./utilsServer/roomActions')
const { loadMessages, sendMsg, setMsgToUnread, deleteMsg } = require('./utilsServer/messageActions')

const PORT = process.env.PORT || 3000


io.on('connection', socket =>
{
  socket.on('join', async ({ userId }) =>
  {
    const users = await addUser(userId, socket.id)

    setInterval(() =>
    {
      socket.emit('connectedUsers',
      {
        users: users.filter(user => user.userId !== userId)
      })

    }, 10000)
  })


  socket.on('loadMessages', async ({ userId, messagesWith }) =>
  {
    const { chat, error } = await loadMessages(userId, messagesWith)

    !error ? socket.emit('messagesLoaded', { chat }) : socket.emit('noChatFound')
  })


  socket.on('sendNewMsg', async ({ userId, msgSendToUserId, msg }) =>
  {
    const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg)
    const receiverSocket = findConnectedUser(msgSendToUserId)

    if(receiverSocket)
    {
      io.to(receiverSocket.socketId).emit('newMsgReceived', { newMsg })
    }
    else
    {
      await setMsgToUnread(msgSendToUserId)
    }

    !error && socket.emit('msgSent', { newMsg })
  })


  socket.on('deleteMsg', async ({ userId, messagesWith, messageId }) =>
  {
    const { success } = await deleteMsg(userId, messagesWith, messageId)

    if (success) socket.emit('msgDeleted')
  })


  socket.on('disconnect', () => removeUser(socket.id))
})

nextApp.prepare().then(() =>
{
  app.use('/api/signup', require('./api/signup'))
  app.use('/api/auth', require('./api/auth'))
  app.use('/api/search', require('./api/search'))
  app.use('/api/profile', require('./api/profile'))
  app.use('/api/chats', require('./api/chats'))

  app.all('*', (req, res) => handle(req, res))

  server.listen(PORT, err =>
  {
    if(err) throw err;

    console.log('Express server running')
  })
})
