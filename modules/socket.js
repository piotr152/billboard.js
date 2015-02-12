exports.setup = function(io){
	io.on("connection", function(socket) {
	console.log("a user connected")
	socket.on("disconnect", function() {
		console.log("user disconnected")
	})

	socket.on("chat message", function(msg) {
		console.log(msg)
		io.emit("chat message", msg)
		fs.appendFile(config.log, JSON.stringify(msg) + "\n")
	})

	socket.on("deletelog", function(msg) {
		fs.unlink(config.log)
		io.emit("logdeleted")
	})
})}