var fs = require("fs")
var db = require("./db")
var config = require("./config")
var persistence = require("./persistence")

socket = null

exports.sendmessage = function(msg) {
	socket.emit("chat message", msg)
        persistence.addMessage(msg)
}

exports.deletelog = function() {
        persistence.clear()
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