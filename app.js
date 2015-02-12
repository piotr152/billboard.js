var express = require("express")
var path = require("path")
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)
var fs = require("fs")
var swig = require("swig")
var config = require("./modules/config")

var args = require("optimist").argv

if (args.title) config.setTitle(args.title)
if (args.css) config.setCss(args.css)
if (args.log) config.setLog(args.log)
if (args.port) config.setPort(args.port)



console.log(config.css)

app.use(express.static(path.join(__dirname, 'static')))
app.engine('html', swig.renderFile)
app.set("views", "./templates")
app.set("view engine", "html")

require("./modules/router").setup(app)

require("./modules/socket").setup(io)





http.listen(config.port, "localhost", function(){console.log("listening to port " + config.port)})