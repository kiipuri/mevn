const express = require("express")
const postRoute = express.Router()

const PostModel = require("../models/Post")
postRoute.route("/sendpost").post((req, res) => {
  const post = new PostModel(req.body)
  post.save().then(res.sendStatus(200))
})

postRoute.route("/get-post/:id").get((req, res) => {
  PostModel.findById(req.params.id).exec((_, doc) => {
    res.json(doc)
  })
})

postRoute.route("/get-posts/:id").get((req, res) => {
  PostModel.find({ userID: req.params.id }).sort({ createdAt: "desc" }).exec((_, docs) => {
    res.json(docs)
  })
})

postRoute.route("/get-all-posts").get((_, res) => {
  PostModel.find({}).sort({ createdAt: "desc" }).exec((_, docs) => {
    res.json(docs)
  })
})

postRoute.route("/send-reply").post((req, res) => {
  const reply = new PostModel({ post: req.body.post, userID: req.body.userID })
  reply.save((_, doc) => {
    PostModel.findById(req.body.parentPostID, (_, doc2) => {
      doc2.comments.push(doc._id)
      doc2.save(() => {
        res.sendStatus(200)
      })
    })
  })
})

postRoute.route("/get-replies/:id").get((req, res) => {
  PostModel.findById(req.params.id, (_, doc) => {
    PostModel.find({ _id: { $in: doc.comments } }, (_, docs) => {
      res.json(docs)
    })
  })
})

postRoute.route("/delete-post/:id").post((req) => {
  PostModel.findByIdAndDelete(req.params.id, () => {

  })
})

// postRoute.route("/like-post/:id").post((req, res) => {
//   PostModel.findById(req.params.id, (_, doc) => {
//     const index = doc.likes.indexOf(req.body.userID)
//     let liked = false
//     if(index > -1) {
//       doc.likes.splice(index, 1)
//     } else {
//       doc.likes.push(req.body.userID)
//       liked = true
//     }
//
//     doc.save(() => {
//       res.json({ liked: liked })
//     })
//   })
// })

module.exports = postRoute
