const express = require('express')
const router = express.Router()
const UserModel = require('../models/UserModel')
const ProfileModel = require('../models/ProfileModel')
const ChatModel = require('../models/ChatModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const userPng = 'https://res.cloudinary.com/dqs3cld9t/image/upload/v1629181606/user_mklcpl_gzbtcd.png'

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/

router.get('/:username', async (req, res) =>
{
  const { username } = req.params

  try
  {
    if (username.length < 1) return res.status(401).send('Invalid')

    if (!regexUserName.test(username)) return res.status(401).send('Invalid')

    const user = await UserModel.findOne({ username: username.toLowerCase() })

    if (user) return res.status(401).send('Username already taken')

    return res.status(200).send('Available')
  }
  catch(error)
  {
    console.error(error)
    
    return res.status(500).send(`Server error`)
  }
})

router.post('/', async (req, res) =>
{
  const { name, email, username, password } = req.body.user

  if(!isEmail(email)) return res.status(401).send('Invalid Email')

  if(password.length < 6)
  {
    return res.status(401).send('Password must be atleast 6 characters')
  }

  try
  {
    let user
  
    user = await UserModel.findOne({ email: email.toLowerCase() })
  
    if(user)
    {
      return res.status(401).send('User already registered')
    }

    user = new UserModel(
    {
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      profilePicUrl: req.body.profilePicUrl || userPng
    })
    user.password = await bcrypt.hash(password, 10)
    
    await user.save()

    let profileFields = {}
    profileFields.user = user._id

    await new ProfileModel(profileFields).save()
    await new ChatModel({ user: user._id, chats: [] }).save()

    const payload = { userId: user._id }

    jwt.sign(payload, process.env.jwtSecret, { expiresIn: '2d' }, (err, token) =>
    {
      if(err) throw err
    
      res.status(200).json(token)
    })
  }
  catch(error)
  {
    console.error(error)
    
    return res.status(500).send(`Server error`)
  }
})


module.exports = router