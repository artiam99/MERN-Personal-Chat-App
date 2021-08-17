const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema(
{
    user: { type: Schema.Types.ObjectId, ref: 'User' }
},
{ timestamps: true }
)

module.exports = mongoose.model('Profile', ProfileSchema)