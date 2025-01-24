import { Color, Stroke, Tool } from "@/hooks/useDraw";

 
 interface Pencil{
    x: number,
    y: number
 }

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
    } | {
        type:"line",
        startX: number,
        startY: number,
        moveX: number,
        moveY: number
    } | {
        type:"pencil",
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
        
        // socket logic to send messages to the backend server;
        console.log("Hello from my side brooohhh");
        socket.send('{ "message" : "checking the server" }');
        socket.onmessage=(event)=>{
            console.log("Hii", event.data);
        }
        // socket logic to send messages to the backend server;

        if(tool=="rectangle"){
            existingShape.push({type:"rect", startX:startX, startY: startY, width: width, height: height });
        }else if(tool=="ellipse"){
            const radius = Math.sqrt(width ** 2 + height ** 2);
            existingShape.push({type:"arc", startX:startX, startY: startY, radius: radius });
        }else if(tool=="line"){
            existingShape.push({type:"line", startX:startX, startY: startY, moveX: event.clientX-rect.left, moveY: event.clientY-rect.top });
        }else if(tool=="pencil"){
            existingShape.push({type:"pencil", path:pencilPath});
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
            ctx.strokeStyle= "black";
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }else if(tool=="line"){
            ctx.beginPath();
            ctx.moveTo( startX, startY );
            ctx.lineTo( event.clientX-rect.left, event.clientY-rect.top );
            ctx.strokeStyle= "black";
            ctx.stroke();
        }else if (tool == "pencil"){
            const currentX = event.clientX - rect.left;
            const currentY = event.clientY - rect.top;  
            pencilPath.push({x:currentX, y:currentY});

            ctx.beginPath();
            ctx.strokeStyle= color;

            for(let i=1 ; i<pencilPath.length; i++){
                ctx.moveTo( pencilPath[i-1].x, pencilPath[i-1].y );
                ctx.lineTo( pencilPath[i].x, pencilPath[i].y  );
                console.log("#33");
            }
            ctx.stroke();
        }else{
            console.log(`We are workign to crete ${tool} tool also`);
        }
      }

   });
   
}


const drawShapesBeforeClear=(ctx:CanvasRenderingContext2D , canvas:HTMLCanvasElement, existingShape:ExistingShape[])=>{
    existingShape.map((shape:ExistingShape)=>{
        if(shape.type == "rect"){
          ctx.strokeStyle= "black";
          ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        }
        else if(shape.type == "arc"){
            ctx.beginPath();
            ctx.arc(shape.startX, shape.startY, shape.radius , 0, 2 * Math.PI); // Circle centered at (100, 100) with radius 50
            ctx.strokeStyle= "black";
            ctx.stroke();
        }else if(shape.type == "line"){
            ctx.beginPath();
            ctx.moveTo( shape.startX, shape.startY );
            ctx.lineTo( shape.moveX, shape.moveY );
            ctx.strokeStyle= "black";
            ctx.stroke();
        }else{
            ctx.beginPath();
            ctx.strokeStyle= "black";

            for(let i=1 ; i<shape.path.length; i++){
                ctx.moveTo( shape.path[i-1].x, shape.path[i-1].y );
                ctx.lineTo( shape.path[i].x, shape.path[i].y  );
                console.log("#33");
            }
            ctx.stroke();
            console.log(existingShape);
        }
    })

}

