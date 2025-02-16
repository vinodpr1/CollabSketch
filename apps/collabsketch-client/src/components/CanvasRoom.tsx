"use client";
import { Spin } from "antd";
import Canvas from "./Canvas";
import useSocket from "@/hooks/useSocket";

const CanvasRoom = (roomid: any) => {
  const { loading, socket } = useSocket(roomid.roomid);

  // if (!socket) return <div className="flex justify-center items-center pt-12"><Spin/></div>

  return !socket ? <div className="flex justify-center items-center pt-12">Loading....</div> : <Canvas socket={socket} roomid={roomid.roomid} />;
};

export default CanvasRoom;
