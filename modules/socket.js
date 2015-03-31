var fs = require("fs")
var config = require("./config")

socket = null

exports.sendmessage = function(msg) {
	console.log(msg)
	socket.emit("chat message", msg)
	fs.appendFile(config.log, JSON.stringify(msg) + "\n")
}

exports.deletelog = function() {
	fs.unlink(config.log)
	console.log("log deleted\n")
	socket.emit("logdeleted")
}

exports.setup = function(io){
	socket = io
	io.on("connection", function(socket) {
	console.log("a user connected")
	socket.on("disconnect", function() {
		console.log("user disconnected")
	})

	socket.on("chat message", exports.sendmessage)

	socket.on("deletelog", exports.deletelog)
})}