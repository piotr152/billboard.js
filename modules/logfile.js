var fs = require("fs")


exports.addMessage = function(msg) {
    fs.appendFile(config.log, JSON.stringify(msg) + "\n")
}

exports.getMessages = function(callback) {
	fs.readFile(config.log, function(err, data){
            	if (err) {
                    callback([])
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
                callback(jsonobjects)
                return
	})
}

exports.clear = function() {
    fs.unlink(config.log)
}