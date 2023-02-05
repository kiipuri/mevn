import express from "express"
const userRoute = express.Router()

import UserModel from "../models/User.js"
userRoute.route("/").get((_, res, next) => {
  UserModel.find((err, data) => {
    if (err) {
      return next(err)
    } else {
      return res.json(data)
    }
  })
})

userRoute.route("/new-user").post((req, res, next) => {
  UserModel.create(req.body, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })
})

userRoute.route("/get-user/:id").get((req, res) => {
  UserModel.findById(req.params.id, "-password", (_, doc) => {
    if (doc === undefined) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(doc)
  })
})

userRoute.route("/find-users/:username").post((req, res) => {
  UserModel.find({ username: { $regex: ".*" + req.params.username + ".*" } }, (_, docs) => {
    res.json(docs)
  })
})

userRoute.route("/login").post((req, res, next) => {
  UserModel.find(req.body, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })
})

userRoute.route("/save-account").post((req, res, next) => {
  UserModel.findById(req.body._id, (err, doc) => {
    if (!doc) {
      return next(err)
    }

    doc.username = req.body.username
    doc.email = req.body.email
    doc.bio = req.body.bio
    doc.password = req.body.password
    doc.save((err) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else {
        res.sendStatus(200)
      }
    })
  })
})

export default userRoute
