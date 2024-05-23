const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO =  require('socket.io');
const { Socket } = require('dgram');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
// const port = 3000|| process.env.PORT;
const corsOptions = {
    origin: 'https://main--chat-with-chitchat.netlify.com/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// app.use(cors());
const users =[{}];
app.get('/',(req,res)=>{
    res.send("Hello World");
})
io.on('connection',(socket)=>{
    console.log("new connection");
    socket.on('joined',({user})=>{
        users[socket.id] = user;
        console.log(`${user} Joined`)
        socket.broadcast.emit('userJoined',{user:"ChitChat", message:`${users[socket.id]} has Joined`});
        socket.emit('welcome',{ user:"ChitChat", message:`${users[socket.id]} Welcome to the Chat`});
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user: users[id],message, id})
    })
  
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"ChitChat", message :`${users[socket.id]} left `})
        console.log(`user left`);
    })
    

});


server.listen(3000,()=>{
    console.log('server started on http://localhost:3000');
});
