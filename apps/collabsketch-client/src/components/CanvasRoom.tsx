"use client";
import { Spin } from "antd";
import Canvas from "./Canvas";
import useSocket from "@/hooks/useSocket";
import { useSession } from "next-auth/react";

const CanvasRoom = (roomid: any) => {
  const { loading, socket } = useSocket(roomid.roomid);
  const session = useSession();
  console.log(session);
  return !socket ? (
    <div className="flex justify-center items-center pt-12">Loading....</div>
  ) : (
    <Canvas socket={socket} roomid={roomid.roomid} />
  );
};

export default CanvasRoom;
