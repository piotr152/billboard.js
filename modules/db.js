config = require("./config")

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(config.db)

exports.setup = function(){
    db.serialize(function() {
        db.run("create table if not exists messages (message text, date text, user text)")
    })
}

exports.addMessage = function(msg) {
    db.serialize(function() {
        db.run("insert into messages values (?, ?, ?);", [msg.message, new Date(msg.date).toUTCString(), msg.user])
    })
}

exports.getMessages = function(callback) { 
    db.serialize(function() {
        db.all("select * from messages", function(err,r) {callback(r)})
    })
    
}

exports.clear = function() {
    db.serialize(function() {
        db.run("delete from messages")
    })
}