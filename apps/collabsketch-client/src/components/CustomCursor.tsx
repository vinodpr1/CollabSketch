import React, { useEffect, useState } from "react";

const CustomCursor=()=>{
    const [position, setPosition] = useState({x:0, y:0});
   
    useEffect(()=>{
        const setCursor = (event: MouseEvent) =>{
            setPosition({x:event.clientX, y:event.clientY});
        };
        document.addEventListener("mousemove", setCursor);
        return()=>document.removeEventListener("mousemove", setCursor);
    },[])

    if(position.x==0 && position.y==0) return;

    return(
        <React.Fragment>
         <style>{`body { cursor: none; }`}</style>
       
        <div style={{
            position:"fixed",
            left: position.x,
            top: position.y,
            height:"15px",
            width:"15px",
            background:"white",
            border:`1px solid oklch(0.373 0.034 259.733)`,
            borderRadius:"50%",
            cursor:"none",
            zIndex: 9999,
        }}>

        </div>
        </React.Fragment>
    )
}

export default CustomCursor;