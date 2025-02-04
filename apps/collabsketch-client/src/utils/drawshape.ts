import { Color, Stroke, Tool } from "@/hooks/useDraw";
import { HTTP_BACKEND_URL } from "@repo/common/HTTP_BACKEND_URL";
import axios from "axios";
 
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
    } | {
      type:"arrow",
      color: string,
      stroke: number,
      startX: number,
      startY: number,
      moveX: number,
      moveY: number
    };

export const drawShape = async(canvas:HTMLCanvasElement, socket:WebSocket, roomid:any) =>{
    const ctx = canvas.getContext("2d");

    //  response from the database
    const existingShape: ExistingShape[] = await getShapes(roomid);;
      
    if(!ctx) return;

    drawShapesBeforeClear(ctx, canvas, existingShape);

    // ctx.fillStyle= "rgb(255, 255, 255)"
    // ctx.fillRect(0,0,canvas.width, canvas.height);
    //@ts-ignore
    let tool = window.currentSelectedTool;
    
    let startX:number=0;
    let startY:number=0;
    let clicked: boolean = false;
    let pencilPath: Pencil[] = [];

    canvas.addEventListener("mousedown",(event:MouseEvent)=>{
        clicked=true;
        //@ts-ignore
        tool = window.currentSelectedTool;

        const rect = canvas.getBoundingClientRect();
        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
    })

    canvas.addEventListener("mouseup",(event:MouseEvent)=>{
        clicked=false;
        pencilPath=[];
        const rect = canvas.getBoundingClientRect();

        let width = event.clientX - startX - rect.left;
        let height = event.clientY - startY - rect.top;

        let shape: ExistingShape | null =null;

        if(tool=="rectangle"){
            shape = {type:"rectangle", color:"black", stroke: 1, startX:startX, startY: startY, width: width, height: height };
        }else if(tool=="ellipse"){
            const radius = Math.sqrt(width ** 2 + height ** 2);
            shape = {type:"ellipse", color:"black", stroke: 1, startX:startX, startY: startY, radius: radius };
        }else if(tool=="line"){
            shape = {type:"line", color:"black", stroke: 1, startX:startX, startY: startY, moveX: event.clientX-rect.left, moveY: event.clientY-rect.top }
        }else if(tool=="pencil"){
            shape = {type:"pencil", color:"black", stroke: 1, path:pencilPath};
        }else if(tool=="arrow"){
            shape = {type:"arrow", color:"black", stroke: 1, startX:startX, startY: startY, moveX: event.clientX-rect.left, moveY: event.clientY-rect.top }
        }

        if(!shape) return;
        existingShape.push(shape);

        // previously sended data from client
        JSON.stringify(shape) 
        
        socket.send(JSON.stringify(shape));
        socket.onmessage=(event)=>{
            existingShape.push(JSON.parse(event.data));
            console.log(event.data);
            drawShapesBeforeClear(ctx, canvas, existingShape);
        }

        
    });

    canvas.addEventListener("mousemove",(event:MouseEvent)=>{
      
      if(clicked){
        const rect = canvas.getBoundingClientRect();
        let width = event.clientX - startX - rect.left;
        let height = event.clientY - startY - rect.top;

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle= "rgb(255, 255, 255)"
        // ctx.fillRect(0, 0, canvas.width, canvas.height)

        drawShapesBeforeClear(ctx, canvas, existingShape);
        ctx.strokeStyle = "black";

        if(tool=="rectangle"){
            ctx.lineWidth = 1;
            // ctx.strokeStyle = color;
            ctx.strokeRect(startX, startY, width, height);
        }else if(tool=="ellipse"){
            const radius = Math.sqrt(width ** 2 + height ** 2);
            ctx.beginPath();
            ctx.lineWidth = 1;
            // ctx.strokeStyle = color;
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }else if(tool=="line"){
            ctx.beginPath();
            ctx.moveTo( startX, startY );
            ctx.lineTo( event.clientX-rect.left, event.clientY-rect.top );
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.closePath();
        }else if(tool == "arrow"){
            ctx.beginPath();
            ctx.moveTo( startX, startY );
            ctx.lineTo( event.clientX-rect.left, event.clientY-rect.top);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.closePath();

            var arrowLen = 10;
            var dx = event.clientX-rect.left - startX;
            var dy = event.clientY-rect.top - startY;
            var angle = Math.atan2(dy, dx);

            ctx.moveTo( event.clientX-rect.left, event.clientY-rect.top );
            ctx.lineTo(event.clientX-rect.left - arrowLen * Math.cos(angle - Math.PI / 6), event.clientY-rect.top - arrowLen * Math.sin(angle - Math.PI / 6));
            ctx.stroke();
          
            ctx.moveTo( event.clientX-rect.left, event.clientY-rect.top );
            ctx.lineTo(event.clientX-rect.left - arrowLen * Math.cos(angle + Math.PI / 6), event.clientY-rect.top - arrowLen * Math.sin(angle + Math.PI / 6));
            ctx.stroke();
           
        }else if (tool == "pencil"){
            const currentX = event.clientX - rect.left;
            const currentY = event.clientY - rect.top;  
            pencilPath.push({x:currentX, y:currentY});

            ctx.beginPath();

            for(let i=1 ; i<pencilPath.length; i++){
                ctx.moveTo( pencilPath[i-1].x, pencilPath[i-1].y );
                ctx.lineTo( pencilPath[i].x, pencilPath[i].y  );
                ctx.lineWidth = 1;
                ctx.strokeStyle = "black";
            }
            ctx.stroke();
        }
      }

   });
   
}

const drawShapesBeforeClear=(ctx:CanvasRenderingContext2D , canvas:HTMLCanvasElement, existingShape:ExistingShape[])=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle= "white"
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    existingShape.map((shape:ExistingShape)=>{
        ctx.strokeStyle= shape.color;
        if(shape.type == "rectangle"){
        //   ctx.strokeStyle= shape.color;
          ctx.lineWidth = shape.stroke;
          ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        }
        else if(shape.type == "ellipse"){
            ctx.beginPath();
            ctx.arc(shape.startX, shape.startY, shape.radius , 0, 2 * Math.PI); // Circle centered at (100, 100) with radius 50
            // ctx.strokeStyle= shape.color;
            ctx.lineWidth = shape.stroke;
            ctx.stroke();
            ctx.closePath();
        }
        else if(shape.type == "line"){
            ctx.beginPath();
            ctx.moveTo( shape.startX, shape.startY );
            ctx.lineTo( shape.moveX, shape.moveY );
            // ctx.strokeStyle= shape.color;
            ctx.lineWidth = shape.stroke;
            ctx.stroke();
            ctx.closePath();
        }
        else if(shape.type == "pencil"){
            ctx.beginPath();
            // ctx.strokeStyle= shape.color;
            ctx.lineWidth = shape.stroke;

            for(let i=1 ; i<shape.path.length; i++){
                ctx.moveTo( shape.path[i-1].x, shape.path[i-1].y );
                ctx.lineTo( shape.path[i].x, shape.path[i].y  );
            }
            ctx.stroke();
            ctx.closePath();
        }else if(shape.type == "arrow"){
            ctx.beginPath();
            ctx.moveTo( shape.startX, shape.startY );
            ctx.lineTo( shape.moveX, shape.moveY );
            // ctx.strokeStyle= shape.color;
            ctx.lineWidth = shape.stroke;
            ctx.stroke();
            ctx.closePath();

            let arrowLen = 10;
            var dx = shape.moveX - shape.startX;
            var dy = shape.moveY - shape.startY;
            var angle = Math.atan2(dy, dx);
            
            ctx.moveTo( shape.moveX, shape.moveY );
            ctx.lineTo(shape.moveX - arrowLen * Math.cos(angle - Math.PI / 6), shape.moveY - arrowLen * Math.sin(angle - Math.PI / 6));
            ctx.stroke();
          
            ctx.moveTo( shape.moveX, shape.moveY );
            ctx.lineTo( shape.moveX - arrowLen * Math.cos(angle + Math.PI / 6), shape.moveY - arrowLen * Math.sin(angle + Math.PI / 6));
            ctx.stroke();
        }
    })
}

const getShapes = async(roomid:any) =>{
    const slug = roomid.split("%20").join(" ");
    const room = await axios.get(`${HTTP_BACKEND_URL}/room/slugroom?slug=${slug}`);
    const chats = await axios.get(`${HTTP_BACKEND_URL}/chat/messages?roomid=${room.data.response.id}`);
    if(!chats) return;
    const parsedChat = chats.data.chats.map((data:any)=>{
        console.log("Hiiii", data.message);
        return JSON.parse(data.message);
    })
    return parsedChat;
}
