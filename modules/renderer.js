var fs = require("fs")

exports.render = function(req, res, template, log, title, user, css) {
	fs.readFile(log, function(err, data){
		if (err) {
			res.render(template, {data: [], title: title, user: user, css: css})
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
		console.log(css)
		res.render(template, {data: jsonobjects, title: title, user: user, css: css})
	})	
} 
