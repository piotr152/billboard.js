var config = require("./config")
var s = require("./socket")

var socket = null

exports.setup = function(io) {
	socket = io
}

exports.postmessage = function(req, res) {
	message = req.body.m
	date = new Date()
	s.sendmessage({message: message, date: date})
	res.send("You sent "+message+"\n")
}

exports.clear = function(req, res) {
	s.deletelog()
	res.send("Log Deleted")
}