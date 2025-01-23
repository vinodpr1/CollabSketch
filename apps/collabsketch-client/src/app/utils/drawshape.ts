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
    };

const existingShape:ExistingShape[] = [];

export const drawShape = (canvas:HTMLCanvasElement, shape:string) =>{
    const ctx = canvas.getContext("2d");
    if(!ctx) return;
   
    console.log("Shape name is", shape);
  
    ctx.fillStyle= "rgba(0, 0, 0)"
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    let startX:number=0;
    let startY:number=0;
    let height:number=0;
    let width:number=0;
    let clicked: boolean = false;
   

    canvas.addEventListener("mousedown",(event:MouseEvent)=>{
        clicked=true;
        const rect = canvas.getBoundingClientRect();
        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
    })

    canvas.addEventListener("mouseup",(event:MouseEvent)=>{
        clicked=false;
        const rect = canvas.getBoundingClientRect();
        if(shape=="rect"){
            existingShape.push({type:"rect", startX:startX, startY: startY, width: width, height: height });
        }else if(shape=="arc"){
            const radius = Math.sqrt(width ** 2 + height ** 2);
            existingShape.push({type:"arc", startX:startX, startY: startY, radius: radius });
        }else if(shape=="line"){
            existingShape.push({type:"line", startX:startX, startY: startY, moveX: event.clientX-rect.left, moveY: event.clientY-rect.top });
        }
    })

    canvas.addEventListener("mousemove",(event:MouseEvent)=>{
      
      if(clicked){
        const rect = canvas.getBoundingClientRect();
        width = event.clientX - startX - rect.left;
        height = event.clientY - startY - rect.top;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle= "rgba(0, 0, 0)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        drawShapesBeforeClear(ctx, canvas, existingShape);

        if(shape=="rect"){
            ctx.strokeStyle= "white";
            ctx.strokeRect(startX, startY, width, height);
        }else if(shape=="arc"){
            const radius = Math.sqrt(width ** 2 + height ** 2);
            ctx.beginPath();
            ctx.strokeStyle= "white";
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }else if(shape=="line"){
            ctx.beginPath();
            ctx.moveTo( startX, startY );
            ctx.lineTo( event.clientX-rect.left, event.clientY-rect.top );
            ctx.strokeStyle= "white";
            ctx.stroke();
        }
        
      }
   });
   

}


const drawShapesBeforeClear=(ctx:CanvasRenderingContext2D , canvas:HTMLCanvasElement, existingShape:ExistingShape[])=>{
    existingShape.map((shape:ExistingShape)=>{
        if(shape.type == "rect"){
          ctx.strokeStyle= "white";
          ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        }
        else if(shape.type == "arc"){
            ctx.beginPath();
            ctx.arc(shape.startX, shape.startY, shape.radius , 0, 2 * Math.PI); // Circle centered at (100, 100) with radius 50
            ctx.strokeStyle= "white";
            ctx.stroke();
        }else if(shape.type == "line"){
            ctx.beginPath();
            ctx.moveTo( shape.startX, shape.startY );
            ctx.lineTo( shape.moveX, shape.moveY );
            ctx.strokeStyle= "white";
            ctx.stroke();
        }
    })

}

