var db = require("./db")
var logfile = require("./logfile")
var config = require("./config")

exports.setup = function() {
    if (config.persistence == "sqlite") {
        db.setup()
    } else if (config.persistence == "file") {
        
    }
}

exports.addMessage = function(msg) {
    if (config.persistence == "sqlite") {
        db.addMessage(msg)
    } else if (config.persistence == "file") {
        logfile.addMessage(msg)
    }
}

exports.getMessages = function(callback) {
    if (config.persistence == "sqlite") {
        db.getMessages(callback)
    } else if (config.persistence == "file") {
        logfile.getMessages(callback)
    }
}


exports.clear = function() {
    if (config.persistence == "sqlite") {
        db.clear()
    } else if (config.persistence == "file") {
        logfile.clear()
    }
}
