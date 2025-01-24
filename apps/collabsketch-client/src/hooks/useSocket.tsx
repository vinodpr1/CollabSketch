import { useEffect, useState } from "react";

const useSocket=()=>{
    const [loading, setLoading] = useState<boolean>(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    
    useEffect(()=>{
       const wss = new WebSocket("ws://localhost:8100?userid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTczNzI3OTY0MH0.b7OiXU41tdC6RSvDBuOKLRfk4u6QcMx0A3WYDoLyCPA");
       wss.onopen=(()=>{
          setSocket(wss);
          setLoading(false);
       });
    }, []);

    return {loading, socket};
}

export default useSocket;