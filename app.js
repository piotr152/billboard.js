var express = require("express")
var path = require("path")
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)
var fs = require("fs")
var swig = require("swig")

var templatedir = "/templates"

var log = "log.txt"

app.use(express.static(path.join(__dirname, 'static')))
app.engine('html', swig.renderFile)
app.set("views", "./templates")
app.set("view engine", "html")

app.get("/write", function(req, res){
	fs.readFile("log.txt", function(err, data){
		if (err) {
			res.render("write", {data: []})
			return
		}
		var logcontent = data.toString().split("\n")
		var jsonobjects = []
		logcontent.forEach(function(e,i,a){
			if (e != "" && typeof e != "undefined") {
				try {
					var j = JSON.parse(e, function(k,v){
						if (k == "date")
							return new Date(v).toUTCString()
						else
							return v
					})
					jsonobjects.push(j)
				} catch (e){}
				
			}
		})
		res.render("write", {data: jsonobjects})
	})
})

app.get("/", function(req, res){


	fs.readFile("log.txt", function(err, data){
		if (err) {
			res.render("watch", {data: []})
			return
		}
		var logcontent = data.toString().split("\n")
		var jsonobjects = []
		logcontent.forEach(function(e,i,a){
			if (e != "" && typeof e != "undefined") {
				try {
					var j = JSON.parse(e, function(k,v){
						if (k == "date")
							return new Date(v).toUTCString()
						else
							return v
					})
					jsonobjects.push(j)
				} catch (e){}
				
			}
		})
		res.render("watch", {data: jsonobjects})
	})
})


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
})


http.listen(8000, "localhost", function(){})