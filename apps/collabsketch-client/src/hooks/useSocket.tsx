import { useEffect, useState } from "react";

const useSocket = (slug: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const wss = new WebSocket(
      `ws://localhost:8100?userid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0MDM3OTkwLWU4ODYtNDJhZS04MjkyLWNmN2MxYWEwYjIwMCIsImlhdCI6MTc0MjY0NjAzN30.fdZJ7IpHwZoEbBNHzIauYi8_idgjmbU3Y4HZXY2PJiE&slug=${slug}`,
    );
    wss.onopen = () => {
      setSocket(wss);
      setLoading(false);
    };
  }, [slug]);

  return { loading, socket };
};

export default useSocket;
