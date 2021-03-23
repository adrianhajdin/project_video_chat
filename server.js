const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
	  origin: '*',
	}
})

var allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
}
	app.use(allowCrossDomain); // plumbing it in as middleware

const cors = require('cors');
app.use(cors());

io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(5000, () => console.log("server is running on port 5000"))
