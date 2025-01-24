import { Type, Minus } from "lucide-react"
import { Color, Size, Stroke } from "@/hooks/useDraw"


interface FilterProps {
    setColor: (colirId: Color) => void
    color: Color
    setSize: (size: Size) => void
    size: Size
    stroke: Stroke
    setStroke: (stroke: Stroke) => void
}

const Filterbar = ({ color, setColor, size, setSize, stroke, setStroke }: FilterProps) => {

    const colors = ['#001219' as Color, '#ed9824' as Color, '#ff0000' as Color, '#ff0080' as Color, '#9158f4' as Color, '#3bb273' as Color];
    const sizes = [{ id: "S", size: 12 as Size }, { id: "M", size: 16 as Size }, { id: "L", size: 20 as Size }, { id: "XL", size: 24 as Size }];
    const strokes = [{id:"font-light",size: 1 as Stroke}, {id:"font-normal",size: 2 as Stroke}, {id:"font-semibold",size: 3 as Stroke}, {id:"font-bold",size: 4 as Stroke}, {id:"font-extrabold",size: 5 as Stroke}];

    return (
        <div className='absolute bg-white bottom-0 m-2'>
            <div className='border flex flex-col gap-2 px-2 py-1 rounded shadow-lg w-48 h-44'>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col justify-center gap-1">
                        <p className="text-xs text-gray-700">Stroke</p>
                        <div className="flex flex-wrap gap-2">
                            {
                                colors.map((colorId) => {
                                    return (
                                        <button
                                            onClick={() => setColor(colorId)}
                                            key={colorId}
                                            style={{ backgroundColor: colorId }}
                                            className={`h-5 w-5 rounded`}
                                        >
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                        <p className="text-xs text-gray-700">Sizes</p>
                        <div className="flex flex-wrap gap-2">
                            {
                                strokes.map((stroke) => {
                                    return (
                                        <button key={stroke.id}  onClick={() => setStroke(stroke.size)} className={`p-1 rounded transition-all duration-500 cursor-pointer bg-gray-200 `}>
                                          <span className={`text-gray-700 ${stroke.id}`}>---</span>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                        <p className="text-xs text-gray-700">Sizes</p>
                        <div className="flex flex-wrap gap-2">
                            {
                                sizes.map((size) => {
                                    return (
                                        <button
                                            onClick={() => setSize(size.size)}
                                            key={size.id}
                                            className={`h-4 w-4 rounded bg-gray-300 flex justify-center items-center p-3 text-gray-700`}
                                        > 
                                        {size.id}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filterbar















{/* <div className="flex flex-col justify-center gap-1">
                        <p className="text-xs text-gray-700">Background</p>
                        <div className="flex flex-wrap gap-2">
                            <div className="h-5 w-5 bg-gray-600 rounded cursor-pointer"></div>
                            <div className="h-5 w-5 bg-red-300 rounded cursor-pointer"></div>
                            <div className="h-5 w-5 bg-green-300 rounded cursor-pointer"></div>
                            <div className="h-5 w-5 bg-orange-300 rounded cursor-pointer"></div>
                            <div className="h-5 w-5 bg-pink-300 rounded cursor-pointer"></div>
                            <div className="h-5 w-5 bg-purple-300 rounded cursor-pointer"></div>
                        </div>
                    </div> */}