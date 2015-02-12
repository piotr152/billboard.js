var fs = require("fs")
var config = require("./config")


exports.render = function(req, res, template, user) {
	fs.readFile(config.log, function(err, data){
		if (err) {
			res.render(template, {data: [], title: config.title, user: user, css: config.css})
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
		res.render(template, {data: jsonobjects, title: config.title, user: user, css: config.css})
	})	
} 
