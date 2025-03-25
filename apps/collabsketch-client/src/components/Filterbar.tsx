import { Color, Backgroung, Size, Stroke, Edge } from "@/hooks/useDraw";

interface FilterProps {
  setColor: (colirId: Color) => void;
  color: Color;
  setSize: (size: Size) => void;
  size: Size;
  stroke: Stroke;
  setStroke: (stroke: Stroke) => void;
  backgroundColor: Backgroung;
  setBackgroundColor: (backgroundColor: Backgroung) => void;
  edge: Edge;
  setEdge: (edge: Edge) => void;
}

const Filterbar = ({
  color,
  setColor,
  backgroundColor,
  setBackgroundColor,
  size,
  setSize,
  stroke,
  setStroke,
  edge,
  setEdge
}: FilterProps) => {
  const colors = [
    "#001219" as Color,
    "#ed9824" as Color,
    "#ff0000" as Color,
    "#ff0080" as Color,
    "#9158f4" as Color,
    "#3bb273" as Color,
  ];
  const backgroungColor = [
    "none" as Backgroung,
    "#DBD8D3" as Backgroung,
    "#CCABD0" as Backgroung,
    "#F5EDA8" as Backgroung,
    "#FFD0C7" as Backgroung,
    "#AFBED6" as Backgroung,
  ]
  const sizes = [
    { id: "S", size: 12 as Size },
    { id: "M", size: 16 as Size },
    { id: "L", size: 20 as Size },
    { id: "XL", size: 24 as Size },
  ];
  const strokes = [
    { id: "font-light", size: 1 as Stroke },
    { id: "font-normal", size: 2 as Stroke },
    { id: "font-semibold", size: 3 as Stroke },
    { id: "font-bold", size: 4 as Stroke },
    { id: "font-extrabold", size: 5 as Stroke },
  ];

  const edges = [
    { radious: 0 as Edge },
    { radious: 1 as Edge },
    { radious: 2 as Edge },
    { radious: 3 as Edge },
    { radious: 4 as Edge },
  ];


  return (
    <div className="fixed bg-white bottom-0 m-2">
      <div className="border flex flex-col gap-2 px-2 py-1 rounded shadow-lg w-48">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-center gap-1">
            <p className="text-xs text-gray-700">Stroke</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((colorId) => {
                return (
                  <button
                    onClick={() => setColor(colorId)}
                    key={colorId}
                    style={{ backgroundColor: colorId }}
                    className={`h-5 w-5 rounded ${colorId == color ? "border-2 border-gray-400" : ""}`}
                  ></button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <p className="text-xs text-gray-700">Background</p>
            <div className="flex flex-wrap gap-2">
              {backgroungColor.map((backgrounsColorId) => {
                return (
                  <button
                    onClick={() => setBackgroundColor(backgrounsColorId)}
                    key={backgrounsColorId}
                    style={{ backgroundColor: backgrounsColorId }}
                    className={`h-5 w-5 rounded ${backgrounsColorId == backgroundColor ? "border-2 border-gray-400" : "border"}`}
                  ></button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <p className="text-xs text-gray-700">Stroke Width</p>
            <div className="flex flex-wrap gap-2">
              {strokes.map((st) => {
                return (
                  <button
                    key={st.id}
                    onClick={() => setStroke(st.size)}
                    className={`${st.size == stroke ? "bg-purple-200" : ""}  h-7 w-7 rounded transition-all duration-500 cursor-pointer bg-gray-200`}
                  >
                    <span className={`text-gray-700 p-1 ${st.id}`}>---</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <p className="text-xs text-gray-700">Edges</p>
            <div className="flex flex-wrap gap-2">
              {edges.map((ed) => {
                const isSelected = ed.radious === edge;
                return (
                  <button
                    key={ed.radious}
                    onClick={() => setEdge(ed.radious)}
                    style={{ borderRadius: ed.radious }}
                    className={`h-6 w-6 p-1 transition-all duration-500 cursor-pointer bg-gray-200 border ${isSelected ? "border-gray-500" : "border-black"
                      } ${isSelected ? "bg-purple-200" : ""}`}
                  ></button>
                );
              })}
            </div>
          </div>


          <div className="flex flex-col justify-center gap-1">
            <p className="text-xs text-gray-700">Sizes</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((sz) => {
                return (
                  <button
                    onClick={() => setSize(sz.size)}
                    key={sz.id}
                    className={`${sz.size == size ? "bg-purple-200" : ""} h-4 w-4 rounded flex justify-center items-center p-3 text-gray-700 transition-all duration-500 cursor-pointer bg-gray-200`}
                  >
                    {sz.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
