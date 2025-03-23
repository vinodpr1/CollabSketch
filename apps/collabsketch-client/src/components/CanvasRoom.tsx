// "use client";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import Canvas from "./Canvas";
// import useSocket from "@/hooks/useSocket";
// import useWebSocket from "@/hooks/useSocket";

// const CanvasRoom = ({ roomid }: { roomid: string }) => {
//   const { data: session, status } = useSession();
//   const jwtToken = session?.user?.jwtToken || null;

//   // ✅ Call useSocket at the top level
//   const {  socket } = useWebSocket(roomid, jwtToken);

//   if (status === "loading" || !socket) {
//     return <div className="flex justify-center items-center pt-12">Loading...</div>;
//   }

//   return <Canvas socket={socket} roomid={roomid} />;
// };

// export default CanvasRoom;


"use client";
import { useSession } from "next-auth/react";
import Canvas from "./Canvas";
import useWebSocket from "@/hooks/useSocket";


const CanvasRoom = ({ roomid }: { roomid: string }) => {
  const { data: session, status } = useSession();
  const jwtToken = session?.user?.jwtToken || null;

  const { socket, isConnected } = useWebSocket(roomid, jwtToken);

  if (status === "loading") return <div>Loading session...</div>;
  if (!jwtToken) return <div>Please log in</div>;
  if (!isConnected || !socket) return <div>Connecting to WebSocket...</div>;

  return <Canvas socket={socket} roomid={roomid} />;
};

export default CanvasRoom;
