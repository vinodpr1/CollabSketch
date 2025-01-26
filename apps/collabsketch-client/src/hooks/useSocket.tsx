import { useEffect, useState } from "react";

const useSocket=(slug:string)=>{

    const [loading, setLoading] = useState<boolean>(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    
    useEffect(()=>{
       const wss = new WebSocket(`ws://localhost:8100?userid=${localStorage.getItem("token")}&slug=${slug}`);
       wss.onopen=(()=>{
          setSocket(wss);
          setLoading(false);
       });
    }, [slug]);

    return {loading, socket};
}

export default useSocket;