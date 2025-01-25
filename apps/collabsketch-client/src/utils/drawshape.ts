

import { Color, Stroke, Tool } from "@/hooks/useDraw";

 
 interface Pencil{
    x: number,
    y: number
 }

 type ExistingShape = | {
       type:"rectangle",
       color: string,
       stroke: number,
       startX: number,
       startY: number,
       width: number,
       height: number
    } | {
      type:"ellipse",
      color: string,
      stroke: number,
      startX: number,
      startY: number,
      radius: number,
    } | {
        type:"line",
        color: string,
        stroke: number,
        startX: number,
        startY: number,
        moveX: number,
        moveY: number
    } | {
        type:"pencil",
        color: string,
        stroke: number,
        path: any;
    };

const existingShape:ExistingShape[] = [];

export const drawShape = (canvas:HTMLCanvasElement, tool:Tool, color:Color, stroke: Stroke, socket:WebSocket) =>{
    const ctx = canvas.getContext("2d");
    if(!ctx) return;
  
    console.log("selected tool is", tool);
    // ctx.fillStyle= "rgb(255, 255, 255)"
    // ctx.fillRect(0,0,canvas.width, canvas.height);
    
    let startX:number=0;
    let startY:number=0;
    let height:number=0;
    let width:number=0;
    let clicked: boolean = false;
    let pencilPath: Pencil[] = [];

    canvas.addEventListener("mousedown",(event:MouseEvent)=>{
        clicked=true;
        const rect = canvas.getBoundingClientRect();
        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
    })

    canvas.addEventListener("mouseup",(event:MouseEvent)=>{
        clicked=false;
        pencilPath=[];
        const rect = canvas.getBoundingClientRect();

        let shape: ExistingShape | null =null;

        if(tool=="rectangle"){
            shape = {type:"rectangle", color:color, stroke: stroke, startX:startX, startY: startY, width: width, height: height };
        }else if(tool=="ellipse"){
            const radius = Math.sqrt(width ** 2 + height ** 2);
            shape = {type:"ellipse", color:color, stroke: stroke, startX:startX, startY: startY, radius: radius };
        }else if(tool=="line"){
            shape = {type:"line", color:color, stroke: stroke, startX:startX, startY: startY, moveX: event.clientX-rect.left, moveY: event.clientY-rect.top }
        }else if(tool=="pencil"){
            shape = {type:"pencil", color:color, stroke: stroke, path:pencilPath};
        }

        if(!shape) return;
        existingShape.push(shape);

        socket.send(JSON.stringify(shape));
        socket.onmessage=(event)=>{
            existingShape.push(JSON.parse(event.data));
            console.log(JSON.parse(event.data));
            drawShapesBeforeClear(ctx, canvas, existingShape);
        }
        
    });

    canvas.addEventListener("mousemove",(event:MouseEvent)=>{
      
      if(clicked){
        const rect = canvas.getBoundingClientRect();
        width = event.clientX - startX - rect.left;
        height = event.clientY - startY - rect.top;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle= "rgb(255, 255, 255)"
        // ctx.fillRect(0, 0, canvas.width, canvas.height)

        drawShapesBeforeClear(ctx, canvas, existingShape);

        if(tool=="rectangle"){
            ctx.lineWidth = stroke;
            ctx.strokeStyle = color;
            ctx.strokeRect(startX, startY, width, height);
        }else if(tool=="ellipse"){
            const radius = Math.sqrt(width ** 2 + height ** 2);
            ctx.beginPath();
            ctx.lineWidth = stroke;
            ctx.strokeStyle = color;
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }
        else if(tool=="line"){
            ctx.beginPath();
            ctx.moveTo( startX, startY );
            ctx.lineTo( event.clientX-rect.left, event.clientY-rect.top );
            ctx.lineWidth = stroke;
            ctx.strokeStyle = color;
            ctx.stroke();
        }
        else if (tool == "pencil"){
            const currentX = event.clientX - rect.left;
            const currentY = event.clientY - rect.top;  
            pencilPath.push({x:currentX, y:currentY});

            ctx.beginPath();

            for(let i=1 ; i<pencilPath.length; i++){
                ctx.moveTo( pencilPath[i-1].x, pencilPath[i-1].y );
                ctx.lineTo( pencilPath[i].x, pencilPath[i].y  );
                ctx.lineWidth = stroke;
                ctx.strokeStyle = color;
            }
            ctx.stroke();
        }
        else{
            console.log(`We are workign to crete ${tool} tool also`);
        }
      }

   });
   
}


const drawShapesBeforeClear=(ctx:CanvasRenderingContext2D , canvas:HTMLCanvasElement, existingShape:ExistingShape[])=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle= "rgb(255, 255, 255)"
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    existingShape.map((shape:ExistingShape)=>{
        if(shape.type == "rectangle"){
          ctx.strokeStyle= shape.color;
          ctx.lineWidth = shape.stroke;
          ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        }
        else if(shape.type == "ellipse"){
            ctx.beginPath();
            ctx.arc(shape.startX, shape.startY, shape.radius , 0, 2 * Math.PI); // Circle centered at (100, 100) with radius 50
            ctx.strokeStyle= shape.color;
            ctx.lineWidth = shape.stroke;
            ctx.stroke();
        }
        else if(shape.type == "line"){
            ctx.beginPath();
            ctx.moveTo( shape.startX, shape.startY );
            ctx.lineTo( shape.moveX, shape.moveY );
            ctx.strokeStyle= shape.color;
            ctx.lineWidth = shape.stroke;
            ctx.stroke();
        }
        else{
            ctx.beginPath();
            ctx.strokeStyle= shape.color;
            ctx.lineWidth = shape.stroke;

            for(let i=1 ; i<shape.path.length; i++){
                ctx.moveTo( shape.path[i-1].x, shape.path[i-1].y );
                ctx.lineTo( shape.path[i].x, shape.path[i].y  );
            }
            ctx.stroke();
        }
    })
}

