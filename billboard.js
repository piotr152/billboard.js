var express = require("express")
var path = require("path")
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)
var fs = require("fs")
var swig = require("swig")
var config = require("./modules/config")
var bodyparser = require("body-parser")

var args = require("optimist").argv

if (args.title) config.setTitle(args.title)
if (args.css) config.setCss(args.css)
if (args.log) config.setLog(args.log)
if (args.sqlite) config.setLog(args.sqlite)
if (args.port) config.setPort(args.port)
if (args.persistence) config.setPersistence(args.persistence)
if (args.writelink) config.setWriteLink(args.writelink)


require("./modules/persistence").setup()


app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyparser.urlencoded({
        extended: true
    }));
app.engine('html', swig.renderFile)
app.set("views", "./templates")
app.set("view engine", "html")

require("./modules/router").setup(app)

require("./modules/socket").setup(io)

require("./modules/post").setup(io)

http.listen(config.port, "localhost", function(){console.log("listening to port " + config.port)})