"use client"
import React, { useEffect } from 'react'
import { useRef } from 'react'
import { drawShape } from '../utils/drawshape';

const page = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        if(canvasRef.current){
            const canvas = canvasRef.current;
            drawShape(canvas);
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

export default page