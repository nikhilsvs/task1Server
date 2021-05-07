var express = require('express');
var bodyParser = require('body-parser');
var Images = require('../models/images');
var mongoose = require('mongoose');
var imageRouter = express.Router();

imageRouter.use(bodyParser.json());

imageRouter.route('/')
.get((req,res,next)=>{
    Images.find({})
    .then((items)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(items);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    Images.create(req.body)
    .then((items)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(items);
    },(err)=>next(err))
    .catch((err)=>next(err));
})


module.exports = imageRouter;
