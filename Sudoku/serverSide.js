var express = require("express");
var serverSide = express();
var bodyParser = require("body-parser");
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var path = require('path');
var jade = require("jade");

serverSide.use(express.static(path.join(__dirname, 'public')));


serverSide.set("view engine", "ejs");
serverSide.set("view engine", "jade");
var MainWindow = require('./PagesJS/MainWindow');
var GameWindow = require('./PagesJS/GameWindow');

serverSide.use('/', MainWindow);
serverSide.use('/GameWindow', GameWindow);

serverSide.use(bodyParser.urlencoded({extended:true}));

serverSide.post("/GameWindow",function(req,res){
    console.log(req.body);
	var difficultyLvL = req.body.difficulty;
    var name = req.body.UserName;
	res.render("GameWindow",{difficultyLvL:difficultyLvL,name:name});
});

//serverSide.use('/MainWindow', MainWindow);


serverSide.get("*",function(req,res){
    res.send("404");
});

serverSide.listen("3534",function(){
    console.log("Server is up!!");
});