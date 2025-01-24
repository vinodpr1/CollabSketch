"use client";
import { drawShape } from '@/utils/drawshape';
import React, { useEffect, useRef, useState } from 'react'
import Toolbar from './Toolbar';
import { useDraw } from '@/hooks/useDraw';
import Filterbar from './Filterbar';

const Canvas = ({socket}:{socket: WebSocket}) => {

     const { changeTool, tool, color, changeColor, size, changeSize, stroke, changeStroke } = useDraw();
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(()=>{
        if(canvasRef.current){
          const canvas = canvasRef.current;
          drawShape(canvas, tool, color, stroke, socket);
        }
    },[canvasRef, tool, color, stroke]);

  return (
    <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <h1>stroke {stroke}   color {color}  toole {tool}  size{size}</h1>
        <Toolbar  
           setTool={changeTool}
        />
        <Filterbar
          color={color}
          setColor={changeColor}
          size={size}
          setSize={changeSize}
          stroke={stroke}
          setStroke={changeStroke}
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