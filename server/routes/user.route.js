const express = require("express");
const userRoute = express.Router();

let UserModel = require("../models/User");
userRoute.route("/").get((req, res, next) => {
    UserModel.find((err, data) => {
        if(err) {
            return next(err);
        }
        else {
            res.json(data);
        }
    });
});

userRoute.route("/new-user").post((req, res, next) => {
    UserModel.create(req.body, (err, data) => {
        if(err) {
            return next(err);
        }
        else {
            res.json(data);
        }
    });
});

userRoute.route("/get-user/:id").get((req, res, next) => {
    UserModel.findById(req.params.id, "-password", (err, doc) => {
        if(doc.image !== undefined) {
            doc.image = "data:image/png;base64," + doc.image.toString("base64");
        }
        res.json(doc);
    });
});

userRoute.route("/find-users/:username").post((req, res, next) => {
    UserModel.find({ username: { $regex: ".*" + req.params.username + ".*" } }, (err, docs) => {
        for(doc in docs) {
            if(doc.image !== undefined) {
                doc.image = "data:image/png;base64," + doc.image.toString("base64");
            }
        }
        res.json(docs);
    });
});

userRoute.route("/login").post((req, res, next) => {
    UserModel.find(req.body, (err, data) => {
        if(err) {
            return next(err);
        }
        else {
            res.json(data);
        }
    });
});

userRoute.route("/save-account").post((req, res, next) => {
    UserModel.findById(req.body._id, (err, doc) => {
        if(!doc) {
            return next(err);
        }
        else {
            req.body.image = req.body.image.replace("data:image/png;base64,", "");
            doc.image = new Buffer.from(req.body.image, "base64");
            //doc.image = "data:image/png;base64," + doc.image.toString('base64');
            doc.username = req.body.username;
            doc.email = req.body.email;
            doc.bio = req.body.bio;
            doc.password = req.body.password;
            doc.save((err) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

module.exports = userRoute;
