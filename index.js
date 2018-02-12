var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
    console.log("Connected");
});

socket.on('welcomeMessage', function(data){
    console.log(data);
});

socket.on('newUserConnected',function(message){
    console.log(message);
});

socket.on('guess',function(data){

    let myGuess = (Math.floor(Math.random() * 10 ) + 1);
    while(data !== myGuess){
        myGuess = (Math.floor(Math.random() * 10 ) + 1);
        console.log("Wrong Guess");
    }
    console.log("Correct");
    socket.emit('guess',(Math.floor(Math.random() * 10 ) + 1));
});

socket.on('disconnect', function(){
    console.log("Bye Bye");
});
