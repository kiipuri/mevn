import mongoose from "mongoose"
const Schema = mongoose.Schema

const postSchema = new Schema({
  userID: mongoose.Types.ObjectId,
  post: String
}, {
  timestamps: true
})

postSchema.add({
  comments: [mongoose.Types.ObjectId]
})

const Post = mongoose.model("Post", postSchema)
export default Post
