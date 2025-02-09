import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prismaClient } from "@repo/db/prismaclient";

const wss = new WebSocketServer({ port: 8100 });

interface User {
  userId: Number | null;
  rooms: string[];
  ws: WebSocket;
}

type Message = {
  type: string;
  message: string;
  room: string;
};

const users: User[] = [];

// const handleMessages=(users:User[], data:Message, ws: WebSocket)=>{
//     if (data.type == "join_room") {
//        const user = users.find(user=>user.ws == ws);
//        user?.rooms.push(data.room);
//     } else if(data.type == "chat") {
//       users.forEach((user)=>{
//          if(user.rooms.includes(data.room)){
//             user.ws.send(data.message);
//          }
//       })
//     }else{
//       users.map((user)=>{
//          user.ws.send(data.message);
//       })
//     }
// }

function broadcastMessage(message: any) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on("connection", (ws: WebSocket, req: Request) => {
  const rawSlug = req?.url?.split("=")[2];
  const slug = rawSlug?.split("%20").join(" ");

  const urlParams = new URLSearchParams(req?.url?.split("?")[1]);
  const token = urlParams.get("userid");
  if (!token) return;
  const userData = jwt.verify(token, "vinodpr") as JwtPayload;

  // let's check if the user aalready joined that particular room?

  const isExist = users.find((user) => user.userId == userData.id);

  if (isExist) {
    if (!slug) return;
    isExist.rooms.push(slug);
  } else {
    if (!slug) return;
    const user = { userId: userData.id, rooms: [], ws: ws };
    //@ts-ignore
    user.rooms.push(slug);
    users.push(user);
  }

  console.log("All usersss", users);

  //  users.push({
  //    userId: userData.id,
  //    rooms: [],
  //  });

  ws.on("message", async (message: any) => {
    const data = JSON.parse(message.toString());

    //  find the roomid based upon slug in url
    //  const room = await prismaClient.room.findFirst({where:{slug:slug}});
    //  if(!room) return;

    //  dump messages in chat tableesss
    // await prismaClient.chat.create({data:{message: JSON.stringify(data), senderid: userData.id, roomid: room.id}})

    users.forEach((user) => {
      if (user.rooms.includes(slug)) {
        user.ws.send(JSON.stringify(data));
      }
    });
  });
});
