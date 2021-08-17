const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const UserModel = require('../models/UserModel')
const ProfileModel = require('../models/ProfileModel')


// GET PROFILE INFO
router.get('/:username', authMiddleware, async (req, res) =>
{
  try
  {
    const { username } = req.params

    const user = await UserModel.findOne({ username: username.toLowerCase() })
  
    if(!user)
    {
      return res.status(404).send('No User Found')
    }

    const profile = await ProfileModel.findOne({ user: user._id }).populate('user')

    return res.json({ profile })
  }
  catch (error)
  {
    console.error(error)
  
    return res.status(500).send('Server Error')
  }
})

// UPDATE PROFILE
router.post('/update', authMiddleware, async (req, res) =>
{
  try
  {
    const { userId } = req

    const { profilePicUrl } = req.body

    let profileFields = {}

    profileFields.user = userId

    await ProfileModel.findOneAndUpdate({ user: userId }, { $set: profileFields }, { new: true })

    if(profilePicUrl)
    {
      const user = await UserModel.findById(userId)
      
      user.profilePicUrl = profilePicUrl
      
      await user.save()
    }

    return res.status(200).send('Success')
  }
  catch(error)
  {
    console.error(error)
    
    return res.status(500).send('Server Error')
  }
})


module.exports = router