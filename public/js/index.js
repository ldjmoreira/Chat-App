let socket = io()

socket.on('connect',function(){ //conectou com o servidor
    console.log('connected to server.')

    // 1° event

    //socket.emit('createMessage',{// apagado
    //    from: "lorion1",
    //    text: "enviei do cliente"
    //})//
})

socket.on('newMessage', function(message){
    console.log("newMessage: ",message)
})




socket.on('disconnect', function(){ //conectou com o servidor
    console.log('disconnected from server.')
})