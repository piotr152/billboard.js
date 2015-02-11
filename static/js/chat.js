var socket = io();
var date = new Date();

$("form").submit(function(){
	if ($("#m").val() != "") {
		date = new Date()
		//socket.emit("chat message", "<span class='date'>" + date.toUTCString() + ": </span>" + $("#m").val())
		socket.emit("chat message", {message: $("#m").val(), date: date})
		$("#m").val("")
	}
	return false
})

$(".delete").click(function(){
	socket.emit("deletelog")
})

socket.on("chat message", function(msg) {
	$("#messages").append($("<li>").hide().html(msg.message + "<span class='date'>" + new Date(msg.date).toUTCString() + "</span>").fadeIn())
	window.scrollTo(0,document.body.scrollHeight);
})

socket.on("logdeleted", function() {
	$("#messages").fadeOut(function(){
		$("#messages").empty()
		$("#messages").show()
	})
	
})