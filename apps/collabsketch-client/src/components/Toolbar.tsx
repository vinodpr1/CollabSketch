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
  MousePointer,
  Brain,
  WandSparkles,
  BrainCog,
} from "lucide-react";
import { Tool } from "@/hooks/useDraw";
import { useRef, useState } from "react";

interface ToolProps {
  setTool: (tool: Tool) => void;
  tool: string;
}

const Toolbar = ({ setTool, tool }: ToolProps) => {
  const tools = [
    // { id: "select" as Tool, icon: MousePointer2 },
    { id: "rectangle" as Tool, icon: Square },
    { id: "ellipse" as Tool, icon: Circle },
    { id: "line" as Tool, icon: Minus },
    { id: "arrow" as Tool, icon: MoveUpRight },
    { id: "pencil" as Tool, icon: Pencil },
    { id: "text" as Tool, icon: Type },
    { id: "eraser" as Tool, icon: Eraser },
    { id: "select" as Tool, icon: MousePointer },
  ];

  return (
    <div className="fixed m-2 bg-white">
      <div className="border flex gap-2 px-2 py-2 rounded shadow-lg">
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

        {/* <button
          className={`${tool == "undo" ? "bg-purple-200" : ""} p-2 rounded transition-all duration-500 cursor-pointer bg-gray-100`}
        >
          <Undo2
            className={`w-4 h-4 transition-all duration-500 text-gray-700`}
          />
        </button> */}
        {/* <Modal /> */}
      </div>
    </div>
  );
};

export default Toolbar;

export function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  // const modalRef = useRef(null);

  // const handleModalOpen = () => {
  //   if (modalRef.current) {
  //     modalRef.current.showModal();
  //   }
  // }

  return (
    <>
      {/* Button to open the modal */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2  rounded transition-all duration-500 cursor-pointer bg-gray-100`}
      >
        <Brain
          className={`w-4 h-4 transition-all duration-500 text-gray-700`}
        />
      </button>

      {isOpen && (
        <div
          className="fixed top-16 left-[300px] h-[70px] w-[200px] rounded inset-0 flex justify-center z-50  bg-gray-200 border border-gray-200"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div
            className=" rounded-lg w-11/12 p-2 max-w-md bg-gray-200"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Modal content */}
            <ul className="space-y-1">
              <TextToDiagramDialog />
            </ul>
          </div>

          {/* <dialog ref={modalRef} className="outline-none rounded">
             
          </dialog> */}
        </div>
      )}
    </>
  );
}

export function TextToDiagramDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openDialog}
        className="flex items-center gap-2 text-gray-600 cursor-pointer"
      >
        <BrainCog className="h-4 w-4" />
        Text to shape
      </button>

      {/* Dialog backdrop and content */}
      {isOpen && (
        <div
          className="fixed top-16 rounded inset-0 flex justify-center z-50"
          onClick={closeDialog} // Close dialog when clicking outside
        >
          <div
            className="bg-gray-100 rounded-lg p-6 max-w-2xl border-2 border-black w-full mb-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
          >
            {/* Close button */}
            <button
              onClick={closeDialog}
              className="text-gray-500 hover:text-gray-700 float-right"
            >
              &times;
            </button>

            {/* Dialog content */}
            <h2 className="text-xl text-gray-600 font-bold mb-4">
              Text to diagram
            </h2>

            {/* Prompt section */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Prompt</h4>
              <textarea
                placeholder="Describe what you want to see..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            {/* Preview section */}
            <div>
              <h4 className="text-lg font-medium mb-2">Preview</h4>
              <button className="flex items-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300">
                <span>Insert →</span>
                <span className="ml-2">Image</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
