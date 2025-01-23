import { useEffect, useState } from "react";

const useSocket=()=>{
    const [loading, setLoading] = useState<boolean>(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    
    useEffect(()=>{
       const wss = new WebSocket("ws://localhost:8100");
       wss.onopen=(()=>{
          setSocket(wss);
          setLoading(false);
       });
    }, []);

    return {loading, socket};
}

export default useSocket;