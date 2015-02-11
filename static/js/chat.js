var socket = io();
var date = new Date();


$("form").submit(function(){
	if ($("#m").val() != "") {
		date = new Date()
		var user = "" 
		if ($(this).hasClass("ev"))
			user = "ev"
		else if ($(this).hasClass("gmbh"))
			user = "gmbh"

		socket.emit("chat message", {message: $("#m").val(), date: date, user: user})
		$("#m").val("")
	}
	return false
})

$(".delete").click(function(){
	socket.emit("deletelog")
})

socket.on("chat message", function(msg) {
	$("#messages").append($("<li>").addClass(msg.user).hide().html(msg.message + "<span class='date'>" + new Date(msg.date).toUTCString() + "</span>").fadeIn())
	window.scrollTo(0,document.body.scrollHeight);
})

socket.on("logdeleted", function() {
	$("#messages").fadeOut(function(){
		$("#messages").empty()
		$("#messages").show()
	})
	
})