const express = require("express")
const http = require("http")
const app = express()
const cors = require('cors');

const server = http.createServer(app)
const io = require("socket.io")(server, {

		cors: {
		  origin: "https://hungry-euler-bf091b.netlify.app/",
		  methods: ["GET", "POST"],
		  credentials: true
		}
	  ,
	handlePreflightRequest: (req, res) => {
		const headers = {
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
			"Access-Control-Allow-Credentials": true
		};

		res.writeHead(200, headers);
		res.end();
	}	
});

app.use(cors())
app.options('*', cors());


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
