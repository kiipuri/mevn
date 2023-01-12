const express = require("express");
const { default: mongoose } = require("mongoose");
const postRoute = express.Router();

let PostModel = require("../models/Post");
postRoute.route("/sendpost").post((req, res, next) => {
    const post = new PostModel(req.body);
    post.save().then(res.sendStatus(200));
});

postRoute.route("/get-posts/:id").get((req, res, next) => {
    PostModel.find({ userID: req.params.id }).sort({ createdAt: "desc" }).exec((err, docs) => {
        res.json(docs);
    });
});

postRoute.route("/get-all-posts").get((req, res) => {
    PostModel.find({}).sort({ createdAt: "desc" }).exec((err, docs) => {
        res.json(docs);
    });
});

postRoute.route("/send-reply").post((req, res, next) => {
    const reply = new PostModel({ post: req.body.post, userID: req.body.userID });
    reply.save((err, doc) => {
        PostModel.findById(req.body.parentPostID, (err, doc2) => {
            doc2.comments.push(doc._id);
            doc2.save((err, doc3) => {
                res.sendStatus(200);
            });
        });
    });
});

postRoute.route("/get-replies/:id").get((req, res, next) => {
    PostModel.findById(req.params.id, (err, doc) => {
        PostModel.find({ _id: { $in: doc.comments }}, (err, docs) => {
            res.json(docs);
        });
    });
});

postRoute.route("/delete-post/:id").post((req) => {
    console.log(req.params.id);
    PostModel.findByIdAndDelete(req.params.id, (err, _) => {

    });
});

module.exports = postRoute;