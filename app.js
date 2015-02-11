var express = require("express")
var path = require("path")
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)
var fs = require("fs")
var swig = require("swig")
var renderer = require("./modules/renderer")

var templatedir = "/templates"

var log = "log.txt"
var title = "Billboard"
var css = "style.css"

var args = require("optimist").argv

if (args.title) title = args.title
if (args.css) css = args.css

console.log(css)

app.use(express.static(path.join(__dirname, 'static')))
app.engine('html', swig.renderFile)
app.set("views", "./templates")
app.set("view engine", "html")

app.get("/write", function(req,res){renderer.render(req,res,"write",log,title,"", css)})

app.get("/write_gmbh", function(req,res){renderer.render(req,res,"write",log,title,"gmbh",css)})

app.get("/write_ev", function(req,res){renderer.render(req,res,"write",log,title,"ev",css)})

app.get("/", function(req, res){renderer.render(req,res,"watch",log,title,"",css)})


io.on("connection", function(socket) {
	console.log("a user connected")
	socket.on("disconnect", function() {
		console.log("user disconnected")
	})

	socket.on("chat message", function(msg) {
		console.log(msg)
		io.emit("chat message", msg)
		fs.appendFile(log, JSON.stringify(msg) + "\n")
	})

	socket.on("deletelog", function(msg) {
		fs.unlink("log.txt")
		io.emit("logdeleted")
	})
})


http.listen(8000, "localhost", function(){console.log("listening to port 8000")})