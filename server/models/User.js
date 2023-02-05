import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  bio: String,
  image: {
    type: String,
    default: "default.png"
  }
}, {
  timestamps: true
})

const User = mongoose.model("User", userSchema)
export default User
