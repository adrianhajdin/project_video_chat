const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
	cors: {
		origin: "https://priceless-swirles-68e598.netlify.app",
		methods: [ "GET", "POST" ]
	}
});

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

server.listen("https://warm-wildwood-81069.herokuapp.com", () => console.log("server is running on port 5000"))
