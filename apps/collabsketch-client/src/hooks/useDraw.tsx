import { useCallback, useState } from "react";

export type Tool =
  | "select"
  | "pencil"
  | "rectangle"
  | "ellipse"
  | "line"
  | "arrow"
  | "text"
  | "eraser"
  | "undo"
  | "redo";
export type Color =
  | "#001219"
  | "#ed9824"
  | "#ff0000"
  | "#ff0080"
  | "#9158f4"
  | "#3bb273";
export type Backgroung = 
  | "none"
  | "#DBD8D3"
  | "#CCABD0"
  | "#F5EDA8"
  | "#FFD0C7"
  | "#AFBED6";
export type Edge = 
  | 0
  | 1
  | 2
  | 3
  | 4
export type Size = 12 | 16 | 20 | 24;
export type Stroke = 1 | 2 | 2 | 4 | 5;

export const useDraw = () => {
  const [tool, setTool] = useState<Tool>("rectangle");
  const [color, setColor] = useState<Color>("#001219");
  const [backgroundColor, setBackgroundColor] = useState<Backgroung>("none");
  const [size, setSize] = useState<Size>(12);
  const [stroke, setStroke] = useState<Stroke>(1);
  const [edge, setEdge] = useState<Edge>(0);

  const changeTool = useCallback((newTool: Tool) => {
    setTool(newTool);
  }, []);

  const changeColor = useCallback((newColor: Color) => {
    setColor(newColor);
  }, []);

  const changeBackgroundColor = useCallback((newColor: Backgroung)=>{
    setBackgroundColor(newColor);
  },[])

  const changeSize = useCallback((newSize: Size) => {
    setSize(newSize);
  }, []);

  const changeStroke = useCallback((newStroke: Stroke) => {
    setStroke(newStroke);
  }, []);

  const changeEdge = useCallback((newEdge: Edge)=>{
    setEdge(newEdge);
  },[])

  return {
    tool,
    setTool,
    changeTool,
    color,
    setColor,
    changeColor,
    backgroundColor,
    setBackgroundColor,
    changeBackgroundColor,
    size,
    setSize,
    changeSize,
    stroke,
    setStroke,
    changeStroke,
    edge,
    setEdge,
    changeEdge
  };
};
