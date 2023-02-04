const mongoose = require("mongoose")
const Schema = mongoose.Schema

const likeSchema = new Schema({
  userID: mongoose.Types.ObjectId,
  postID: mongoose.Types.ObjectId
}, {
  timestamps: true
})

const Like = mongoose.model("Like", likeSchema)
module.exports = Like

