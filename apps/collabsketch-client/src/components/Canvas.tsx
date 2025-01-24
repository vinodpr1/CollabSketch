"use client";
import { drawShape } from '@/utils/drawshape';
import React, { useEffect, useRef, useState } from 'react'
import Toolbar from './Toolbar';
import { useDraw } from '@/hooks/useDraw';

const Canvas = ({socket}:{socket: WebSocket}) => {

     const { changeTool, tool } = useDraw();
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(()=>{
        if(canvasRef.current){
          const canvas = canvasRef.current;
          drawShape(canvas, tool, socket);
        }
    },[canvasRef, tool]);

  return (
    <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <Toolbar  
           setTool={changeTool}
        />
        <canvas
          ref={canvasRef}
          height={580}
          width={1280}
          className='bg-white bg-[linear-gradient(to_right,#ede4e4_1px,transparent_1px),linear-gradient(to_bottom,#ede4e4_1px,transparent_1px)] bg-[size:6rem_4rem]'
        />
    </div>
  )
}

export default Canvas;