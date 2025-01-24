import {WebSocketServer, WebSocket} from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";

const wss = new WebSocketServer({port:8100});

interface User{
   userId: Number | null,
   rooms: string[],
   ws: WebSocket
}

type Message = {
      type: string;
      message: string;
      room: string;
}
  

const users:User[] = []


const handleMessages=(users:User[], data:Message, ws: WebSocket)=>{
    if (data.type == "join_room") {
       const user = users.find(user=>user.ws == ws);
       user?.rooms.push(data.room);
    } else if(data.type == "chat") {
      users.forEach((user)=>{
         if(user.rooms.includes(data.room)){
            user.ws.send(data.message);
         }
      })
    }else{
      users.map((user)=>{
         user.ws.send(data.message);
      })
    }
}


function broadcastMessage(message:any) {
   wss.clients.forEach(client => {
       if (client.readyState === WebSocket.OPEN) {
           client.send(message);
       }
   });
}

wss.on("connection", (ws:WebSocket, req:Request)=>{
    const urlParams = new URLSearchParams(req?.url?.split("?")[1]);
    const token = urlParams.get("userid")
    if(!token) return
    const data = jwt.verify(token, "vinodpr");
    if(!data) return;
    const parsedData =new URLSearchParams(data);
    const userId = parsedData.get("id");
  
    users.push({
      userId: Number(userId),
      rooms: [],
      ws: ws,
    });

    ws.on("message", (message:any)=>{
       const data = JSON.parse(message.toString());
      //  handleMessages(users, data, ws);
      broadcastMessage("aaa merii jaaan");

    });
})
