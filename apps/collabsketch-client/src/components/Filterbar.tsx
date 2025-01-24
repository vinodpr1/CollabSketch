import { Type, Minus } from "lucide-react"
import { Color, Size, Stroke } from "@/hooks/useDraw"


interface FilterProps {
    setColor: (colirId: Color) => void
    color: Color
    setSize: (size: Size) => void
    size: Size
    stroke : Stroke
    setStroke: (stroke:  Stroke)=> void
}

const Filterbar = ({ color, setColor, size, setSize,  stroke, setStroke }: FilterProps) => {

    const colors = ['#001219' as Color, '#ed9824' as Color, '#ff0000' as Color, '#ff0080' as Color, '#9158f4' as Color, '#3bb273' as Color];
    const sizes = [10 as Size, 14 as Size, 18 as Size, 22 as Size, 24 as Size];
    const strokes = [1 as Stroke, 2 as Stroke, 3 as Stroke, 4 as Stroke, 5 as Stroke,];

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
                                  <button onClick={()=> setStroke(stroke)} key={stroke} className={`p-1 rounded transition-all duration-500 cursor-pointer bg-gray-200 `}>
                                     <Minus style={{width: `${stroke*6}px`, height: `${stroke*6}px`}} className="w-6 h-6 transition-all duration-500 text-gray-700 " />
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
                                  <button onClick={()=> setSize(size)} key={size} className={`p-1 rounded transition-all duration-500 cursor-pointer bg-gray-200 `}>
                                     <Type style={{width: `${size}px`, height: `${size}px`}} className="w-6 h-6 transition-all duration-500 text-gray-700 " />
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