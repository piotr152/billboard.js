var fs = require("fs")
var config = require("./config")
var persistence = require("./persistence")


exports.render = function(req, res, template, user) {
   persistence.getMessages(function(jsonobjects) {
        res.render(template, {data: jsonobjects, title: config.title, user: user, css: config.css})            
    })
} 
