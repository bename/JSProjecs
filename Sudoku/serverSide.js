<<<<<<< f757af95caf157c685e2bf96e1d9934a0a632204
var express = require("express");
var serverSide = express();
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var path = require('path');
//var jade = require("jade");
//var sass = require('node-sass-middleware');

serverSide.set("view engine", "jade");
var MainWindow = require('./PagesJS/MainWindow');
serverSide.use('/MainWindow', MainWindow);

serverSide.listen("3534",function(){
    console.log("Server is up!!");
=======
var express = require("express");
var serverSide = express();
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var path = require('path');
//var jade = require("jade");
//var sass = require('node-sass-middleware');

serverSide.set("view engine", "jade");
var MainWindow = require('./PagesJS/MainWindow');
serverSide.use('/MainWindow', MainWindow);

serverSide.listen("3534",function(){
    console.log("Server is up!!");
>>>>>>> [+] Sudoku project
});