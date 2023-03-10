// Importing required modules
import cors from "cors"
import express, { json } from "express"
import { connect } from "mongoose"
import multer, { diskStorage } from "multer"
import dotenv from "dotenv"

// Defining route middleware
// app.use('/api', require('./routes/api'));

import userAPI from "./routes/user.route.js"
import postAPI from "./routes/post.route.js"
import likeAPI from "./routes/like.route.js"
import imageAPI from "./routes/image.route.js"

const app = express()

const uri = "mongodb://127.0.0.1/epic"
connect(uri)
  .then(() => {
    console.log("Mongodb connected")
  })
  .catch((err) => console.log(err))

// parse env variables
dotenv.config()

// Configuring port
const port = process.env.PORT || 9000

// Configure middlewares
app.use(
  cors({
    origin: "*",
  })
)
app.use(json())

app.set("view engine", "html")

// Static folder
app.use(express.static(import.meta.url + "/views/"))
app.use("/api", userAPI)
app.use("/api", postAPI)
app.use("/api", likeAPI)
app.use("/api", imageAPI)

const storage = diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./images/")
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const upload = multer({ storage })

app.post("/api/send-image", upload.single("image"), (_req, res) => {
  res.sendStatus(200)
})

// Listening to port
app.listen(port)
console.log(`Listening On http://localhost:${port}/api`)

export default app
