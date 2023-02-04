const express = require("express")
const imageRoute = express.Router()
const path = require("path")

imageRoute.route("/get-image/:name").get((req, res) => {
  res.sendFile(path.resolve(__dirname + `/../images/${req.params.name}`))
})

module.exports = imageRoute
