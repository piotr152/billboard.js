var renderer = require("./renderer")
var posts = require("./post")
var config = require("./config")

exports.setup = function(app) {
	app.get("/" + config.writelink, function(req,res){renderer.render(req,res,"write","")})

	app.get("/write_gmbh", function(req,res){renderer.render(req,res,"write","gmbh")})

	app.get("/write_ev", function(req,res){renderer.render(req,res,"write","ev")})

	app.get("/", function(req, res){renderer.render(req,res,"watch","")})

	app.post("/postmessage", function(req, res){posts.postmessage(req,res)})

	app.get("/clear", function(req, res){posts.clear(req,res)})
}