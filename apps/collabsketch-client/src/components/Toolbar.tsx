import {
  Pencil,
  Square,
  Circle,
  MoveUpRight,
  Type,
  Eraser,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react";
import { Tool } from "@/hooks/useDraw";

interface ToolProps {
  setTool: (tool: Tool) => void;
  tool: string;
}

const Toolbar = ({ setTool, tool }: ToolProps) => {
  const tools = [
    // { id: "select" as Tool, icon: MousePointer2 },
    { id: "pencil" as Tool, icon: Pencil },
    { id: "rectangle" as Tool, icon: Square },
    { id: "ellipse" as Tool, icon: Circle },
    { id: "line" as Tool, icon: Minus },
    { id: "arrow" as Tool, icon: MoveUpRight },
    { id: "text" as Tool, icon: Type },
    { id: "eraser" as Tool, icon: Eraser },
  ];

  return (
    <div className="fixed m-2 bg-white">
      <div className="border flex flex-col gap-2 px-2 py-2 rounded shadow-lg">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <button
              onClick={() => setTool(t.id)}
              key={t.id}
              className={`${t.id == tool ? "bg-purple-200" : ""} p-2 rounded transition-all duration-500 cursor-pointer bg-gray-100`}
            >
              <Icon
                className={`w-4 h-4 transition-all duration-500 text-gray-700`}
              />
            </button>
          );
        })}

        <button
          className={`${tool == "undo" ? "bg-purple-200" : ""} p-2 rounded transition-all duration-500 cursor-pointer bg-gray-100`}
        >
          <Undo2
            className={`w-4 h-4 transition-all duration-500 text-gray-700`}
          />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
