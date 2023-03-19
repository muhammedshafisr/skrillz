const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("a user connected")
    socket.emit("welcome", "hello this is from socket server")

    socket.on("send-message", (obj, room) => {
        const {
            sender,
            text
        } = obj;

        if(room === '') {
            return new Error("something went wrong");
        } else {
            const data = {
                sender:{
                    sender
                },
                text
            }
            socket.to(room).emit("receive-message", data)
        }
    })

    socket.on('join-room', room => {
        console.log(1)
        socket.join(room)
    })
})