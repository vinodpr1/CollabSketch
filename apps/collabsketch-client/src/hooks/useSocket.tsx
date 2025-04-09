import { useEffect, useState } from "react";

const WEBSOCKET_SERVER_URL = "ws://localhost:8100"; // Replace with your WebSocket server URL

const useWebSocket = (roomId: string, jwtToken: string | null) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!jwtToken) return;
    const ws = new WebSocket(`${WEBSOCKET_SERVER_URL}?userid=${jwtToken}&slug=${roomId}`);

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({ type: "join", roomId }));
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [roomId, jwtToken]);

  return { socket, isConnected };
};

export default useWebSocket;
