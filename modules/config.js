exports.title = "Billboard"
exports.css = "style.css"
exports.log = "log.txt"
exports.db = "log.sqlite"
exports.writelink = "write"
exports.persistence = "sqlite"
exports.port = 8000

exports.setTitle = function(title) {exports.title = title}
exports.setCss = function(css) {exports.css = css}
exports.setLog = function(log) {exports.log = log}
exports.setPort = function(port) {exports.port = port}
exports.setPersistence = function(persistence) {exports.persistence = persistence}
exports.setWriteLink = function(link) {exports.writelink = link}