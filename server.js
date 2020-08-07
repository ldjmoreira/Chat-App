const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const port = process.env.PORT || 3005

let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static('./public'))
//eventos
io.on('connection',(socket) =>{ //from now on, listening to events made in the client side.
    console.log("novo usuario conectado")

    //socket.on('createMessage',(message)=>{
     //   console.log("mensagem enviada do cliente: ", message)
      
    socket.emit('newMessage',{ 
        from: "Admin",
        text: "Welcome to the chat App!",
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage',{ 
        from: "Admin",
        text: "New user joined",
        createdAt: new Date().getTime()
    })

    socket.on('createMessage',(message)=>{
        console.log("createMessage",message)
        io.emit ('newMessage',{
            from: message.from,
                text: message.text,
                createdAt: new Date().getTime()
            })
        })
        
    
        //   io.emit('newMessage2',{ // it will broadcast what receive to everyone
     //       from: message.from,
     //       text: message.text,
     //       createdAt: new Date().getTime() 
     //   })

     //   socket.broadcast.emit('newMessage2',{// it will broadcast to everyone but me
     //       from: message.from,
     //       text: message.text,
     //       createdAt: new Date().getTime()
     //   })

    //})//

   // socket.emit('newMessage',{ //foi apagado
   //     from: "Servidor",
   //     text: "Esta me ouvindo do chrome?"
   // })//

    socket.on('disconnect', () => {
        console.log("usuario desconectado")
    })
})




server.listen(port, ()=>{
    console.log(`Serve is up on port  ${port}`)
})