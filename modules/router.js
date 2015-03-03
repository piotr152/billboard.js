var renderer = require("./renderer")
var config = require("./config")

exports.setup = function(app) {
	app.get("/" + config.writelink, function(req,res){renderer.render(req,res,"write","")})

	app.get("/write_gmbh", function(req,res){renderer.render(req,res,"write","gmbh")})

	app.get("/write_ev", function(req,res){renderer.render(req,res,"write","ev")})

	app.get("/", function(req, res){renderer.render(req,res,"watch","")})
}