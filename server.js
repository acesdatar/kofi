var server = require('http').createServer();
var io = require('socket.io')(server);
let connectedUsers = 0;
const MAX_NUMBER_OF_USERS = 2;
const MAX_GUESS_NUMBER = 10;
let userIDs = [];

io.on('connection', function(client){
    if(connectedUsers < MAX_NUMBER_OF_USERS ){
        console.log("Client Connected");
        connectedUsers++;

        userIDs.push(client.id);

        console.log(`${connectedUsers} Users Connected`);
        client.emit('welcomeMessage',"Hey There, Welcome to Kofi's Game");
    
        client.broadcast.emit('newUserConnected',"Hey Guys, A new player joined the game");

        if(connectedUsers == MAX_NUMBER_OF_USERS){
            let randomUser = Math.floor(Math.random() * MAX_NUMBER_OF_USERS);
            io.to(userIDs[randomUser]).emit('guess',(Math.floor(Math.random() * MAX_GUESS_NUMBER) + 1));
        }

        client.on('guess',function(data){
            client.broadcast.emit('guess',data);
        });

        client.on('disconnect', function(){
            console.log("Client Disconnected");
        });
    }else{
        client.disconnect();
    }
});

server.listen(3000);