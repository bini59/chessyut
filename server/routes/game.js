let chsinfo = {}


let rooms = {room : []}
let users = {}

const connect = (app, socket)=>{
    app.io.emit("updateRoom", rooms);
    // create Room and update Room
    socket.on("updateRoom", (data)=>{
        rooms.room.push({
            title: data.title,
            np: data.np
        });
        app.io.emit("updateRoom", rooms)
    })  
    socket.on("joinRoom", (data)=>{
        socket.join(data.title)
        for(var i = 0; i < rooms.room.length; i++){
            if(data.title == rooms.room[i].title){
                rooms.room[i].np += 1;
                break
            }
        }
        users[socket.id] = socket.rooms
        app.io.emit("updateRoom", rooms)
        app.io.in(data.title).emit("newPlayer", data.user)

    })

}



module.exports = connect;