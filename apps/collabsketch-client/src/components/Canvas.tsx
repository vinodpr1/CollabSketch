"use client";
import { drawShape } from "@/utils/drawshape";
import React, { useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";
import { useDraw } from "@/hooks/useDraw";
import Filterbar from "./Filterbar";
import { HTTP_BACKEND_URL } from "@repo/common/HTTP_BACKEND_URL";
import axios from "axios";
import "./global.css";
import CustomCursor from "./CustomCursor";

interface CordsType {
  x: number;
  y: number;
}

const Canvas = ({ socket, roomid }: { socket: WebSocket; roomid: any }) => {
  const {
    changeTool,
    tool,
    color,
    changeColor,
    size,
    changeSize,
    stroke,
    changeStroke,
  } = useDraw();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      drawShape(canvas, socket, roomid, tool, color, stroke);
    }
    return () => {};
  }, [canvasRef, color, stroke, tool]);
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <Toolbar setTool={changeTool} tool={tool} />
      <Filterbar
        color={color}
        setColor={changeColor}
        size={size}
        setSize={changeSize}
        stroke={stroke}
        setStroke={changeStroke}
      />
      {tool == "eraser" && <CustomCursor />}
      <canvas
        ref={canvasRef}
        height={980}
        width={1780}
        className={` bg-white bg-[linear-gradient(to_right,#ede4e4_1px,transparent_1px),linear-gradient(to_bottom,#ede4e4_1px,transparent_1px)] bg-[size:6rem_4rem]`}
      />
    </div>
  );
};

export default Canvas;
