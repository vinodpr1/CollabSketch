// "use clinet";
// import { useEffect, useState } from "react";

// const useSocket = (slug: string, token: any) => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [socket, setSocket] = useState<WebSocket | null>(null);

//   // useEffect(() => {
//   //   const wss = new WebSocket(
//   //     `ws://localhost:8100?userid=${token}&slug=${slug}`,
//   //   );
//   //   wss.onopen = () => {
//   //     setSocket(wss);
//   //     setLoading(false);
//   //   };
//   // }, [slug]);

//   const wss = new WebSocket(
//     `ws://localhost:8100?userid=${token}&slug=${slug}`,
//   );
//   wss.onopen = () => {
//     setSocket(wss);
//     setLoading(false);
//   };

//   return { loading, socket };
 
// };

// export default useSocket;






import { useEffect, useState } from "react";

const WEBSOCKET_SERVER_URL = "ws://localhost:8100"; // Replace with your WebSocket server URL

const useWebSocket = (roomId: string, jwtToken: string | null) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!jwtToken) return;
    console.log("Token", jwtToken);
    const ws = new WebSocket(`${WEBSOCKET_SERVER_URL}?userid=${jwtToken}&slug=${roomId}`);

    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
      setIsConnected(true);
      ws.send(JSON.stringify({ type: "join", roomId }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("📩 Message from server:", message);
    };

    ws.onclose = () => {
      console.log("❌ WebSocket Disconnected");
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
