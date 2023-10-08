const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001"
  }
});

const RoomData= {}

io.on("connection", (socket) => {
  // ...
  console.log(socket.id);
  
  socket.on("room: Joining", (data)=>{
    const {name,room,socketid} = data;

    if (RoomData[room]) {
        RoomData[room].push(data); // Add the user to the room
      } else {
        const data1= {...data, created: true}
        RoomData[room] = [data1]; // Create a new room and add the user
      }
      socket.join(room);
    
    
    io.to(room).emit("room: userjoined", RoomData[room]);
   
    console.log(RoomData)
  });

  socket.on("room: Elements", (data)=>{
    socket.to(data.room).emit("room: ElementsData", data.elements);
  })

  // socket.on("disconnect", () => {

  // });

});

httpServer.listen(3000, ()=>{
    console.log("server is running")
});
