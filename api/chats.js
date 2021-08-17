const express = require('express')
const router = express.Router()
const ChatModel = require('../models/ChatModel')
const UserModel = require('../models/UserModel')
const authMiddleware = require('../middleware/authMiddleware')


// GET ALL CHATS
router.get('/', authMiddleware, async (req, res) =>
{
  try
  {
    const { userId } = req

    const user = await ChatModel.findOne({ user: userId }).populate('chats.messagesWith')

    let chatsToBeSent = []

    if(user.chats.length > 0)
    {
      chatsToBeSent = await user.chats.map(chat => (
      {
        messagesWith: chat.messagesWith._id,
        name: chat.messagesWith.name,
        profilePicUrl: chat.messagesWith.profilePicUrl,
        lastMessage: chat.messages[chat.messages.length - 1].msg,
        date: chat.messages[chat.messages.length - 1].date
      }))
    }

    return res.json(chatsToBeSent)
  }
  catch(error)
  {
    console.error(error)
    
    return res.status(500).send('Server Error')
  }
})


// GET USER INFO
router.get('/user/:userToFindId', authMiddleware, async (req, res) =>
{
  try
  {
    const user = await UserModel.findById(req.params.userToFindId)

    if(!user)
    {
      return res.status(404).send('No User found')
    }

    return res.json({ name: user.name, profilePicUrl: user.profilePicUrl })
  }
  catch(error)
  {
    console.error(error)
    
    return res.status(500).send('Server Error')
  }
})


// Delete a chat
router.delete(`/:messagesWith`, authMiddleware, async (req, res) =>
{
  try
  {
    const { userId } = req
    const { messagesWith } = req.params

    const user = await ChatModel.findOne({ user: userId })

    const chatToDelete = user.chats.find(chat => chat.messagesWith.toString() === messagesWith.toString())

    if(!chatToDelete)
    {
      return res.status(500).send('Chat deleted')
    }

    const indexOf = user.chats.map(chat => chat.messagesWith.toString()).indexOf(messagesWith)

    user.chats.splice(indexOf, 1)

    await user.save()

    return res.status(200).send('Chat deleted')
  }
  catch (error)
  {
    console.error(error)

    return res.status(500).send('Server Error')
  }
})

module.exports = router