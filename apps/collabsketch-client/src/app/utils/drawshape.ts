 type ExistingShape = | {
       type:"rect",
       startX: number,
       startY: number,
       width: number,
       height: number
    } | {
      type:"arc",
      startX: number,
      startY: number,
      radius: number,
      startAngle: number,
      endAngle: number
    };

export const drawShape = (canvas:HTMLCanvasElement) =>{
    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    const existingShape:ExistingShape[] = [];

    ctx.fillStyle= "rgba(0, 0, 0)"
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    let startX:number=0;
    let startY:number=0;
    let height:number=0;
    let width:number=0;
    let clicked: boolean = false;

    canvas.addEventListener("mousedown",(event:MouseEvent)=>{
        clicked=true;
        startX = event.clientX;
        startY = event.clientY;
    })

    canvas.addEventListener("mouseup",(event:MouseEvent)=>{
        clicked=false;
        existingShape.push({type:"rect", startX:startX, startY: startY, width: width, height: height});
    })

    canvas.addEventListener("mousemove",(event:MouseEvent)=>{
      
      if(clicked){

          width = event.clientX - startX;
          height = event.clientY - startY;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle= "rgba(0, 0, 0)"
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          drawShapesBeforeClear(ctx, canvas, existingShape);

          ctx.strokeStyle= "white";
          ctx.strokeRect(startX, startY, width, height);

      }

    })
}


const drawShapesBeforeClear=(ctx:CanvasRenderingContext2D , canvas:HTMLCanvasElement, existingShape:ExistingShape[])=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle= "rgba(0, 0, 0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    existingShape.map((shape:ExistingShape)=>{
        if(shape.type == "rect"){
          ctx.strokeStyle= "white";
          ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        }
    })

}