const express = require("express")
const likeRoute = express.Router()

const LikeModel = require("../models/Like")
likeRoute.route("/like-post").post((req, res) => {
  LikeModel.findOne(req.body).exec((_, doc) => {
    if(doc !== null) {
      doc.deleteOne()
      return res.json({ liked: false })
    }

    LikeModel.create(req.body, (err) => {
      if(err) {
        res.sendStatus(500)
      }
      else {
        res.json({ liked: true })
      }
    })
  })
})

likeRoute.route("/get-post-likes/:id").get((req, res) => {
  LikeModel.find({ postID: req.params.id}, "userID" ).exec((_, docs) => {
    return res.json(docs)
  })
})

module.exports = likeRoute
