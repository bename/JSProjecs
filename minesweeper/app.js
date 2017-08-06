var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jade = require("jade");
var sass = require('node-sass-middleware');
var path = require('path');

var routes = require('./routes/home');
var board = require('./routes/board');

app.use(sass({
	src: __dirname + '/sass',
	dest: __dirname + '/public',
	debug: true
}));

app.use(express.static(path.join(__dirname , "public")));

app.set("view engine", "ejs");
app.set("view engine", "jade");

app.use(bodyParser.urlencoded({extended:true}));

 app.get("/", function(req,res){
 	res.render("home");
 });

app.use('/', routes);

app.use('/board',board);

 app.post("/getboard",function(req,res){
 	var bodySize = req.body.boardSize;
	res.render("board",{bodySize:bodySize});
 });

app.get("*",function(req,res){
    res.send("There is no available path you entered!");
});

app.listen("3333",function(){
    console.log("Server is up!!");
});