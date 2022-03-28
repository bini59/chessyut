let chsinfo = {}


let rooms = {room : []}

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
}



module.exports = connect;