import { useCallback, useState } from "react";

export type Tool = 'select' | 'pencil' | 'rectangle' | 'ellipse' | 'line' | 'text' | 'eraser' | 'undo' | 'redo'


export const useDraw=()=>{
    const [tool, setTool] = useState<Tool>('pencil')

    const changeTool = useCallback((newTool: Tool) => {
        setTool(newTool)
    }, [])
    

    return { changeTool, tool, setTool }
}