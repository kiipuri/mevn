import express from "express"
import path from "path"
const imageRoute = express.Router()

imageRoute.route("/get-image/:name").get((req, res) => {
  res.sendFile(path.resolve(`images/${req.params.name}`))
})

export default imageRoute
