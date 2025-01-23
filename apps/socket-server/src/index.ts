import {WebSocketServer, WebSocket} from "ws";

const wss = new WebSocketServer({port:8100});

wss.on("connection", (ws:WebSocket)=>{
    console.log("Socket COnnection completed");
    ws.on("message", (message:any)=>{
      
      ws.send("Hello bhaiii");

    })
})

console.log("Listening the messages");