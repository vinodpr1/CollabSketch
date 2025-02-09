"use client";
import Canvas from "./Canvas";
import useSocket from "@/hooks/useSocket";

const CanvasRoom = (roomid: any) => {
  const { loading, socket } = useSocket(roomid.roomid);

  if (!socket) return <h1 className="text-black">Loading the content......</h1>;

  return <Canvas socket={socket} roomid={roomid.roomid} />;
};

export default CanvasRoom;
