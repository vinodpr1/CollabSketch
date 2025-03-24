"use client";
import { useSession } from "next-auth/react";
import Canvas from "./Canvas";
import useWebSocket from "@/hooks/useSocket";

const CanvasRoom = ({ roomid }: { roomid: string }) => {
  const { data: session, status } = useSession();
  const jwtToken = session?.user?.jwtToken || null;

  const { socket, isConnected } = useWebSocket(roomid, jwtToken);

  if (status === "loading") return <div>Loading...</div>;
  if (!jwtToken) return <div>Please log in</div>;
  if (!isConnected || !socket) return <div>Loading...</div>;

  return <Canvas socket={socket} roomid={roomid} />;
};

export default CanvasRoom;
