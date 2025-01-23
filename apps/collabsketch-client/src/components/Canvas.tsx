"use client";
import { drawShape } from '@/app/utils/drawshape';
import React, { useEffect, useRef, useState } from 'react'

const Canvas = ({socket}:{socket: WebSocket}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [shape, setShape] = useState<string>("rect");
   
   
    useEffect(()=>{
        if(canvasRef.current){
          const canvas = canvasRef.current;
          drawShape(canvas, shape, socket);
        }
    },[canvasRef]);

  return (
    <div>
        <canvas
          ref={canvasRef}
          height={580}
          width={1280}
          className='rgba(0, 0, 0)'
        />
    </div>
  )
}

export default Canvas;