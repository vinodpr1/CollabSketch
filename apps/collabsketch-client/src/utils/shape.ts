export const DrawEllipse = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number,
  stroke?: number | 1,
  color?: string | "black",
) => {
  if (stroke && color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = stroke;
  }
  const radius = Math.sqrt(width ** 2 + height ** 2);
  ctx.beginPath();
  ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
};

export const DrawLine = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  moveX: number,
  moveY: number,
) => {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(moveX, moveY);
  ctx.stroke();
  ctx.closePath();
};


export const DrawRectangle = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number,
  edge: number,
  backgroundColor?: string 
) => {
  
  // if(backgroundColor != "none" && backgroundColor){
  //   ctx.fillStyle = backgroundColor!; 
  //   ctx.fillRect(startX, startY, width, height);
  // }
  // ctx.strokeRect(startX, startY, width, height);
  // console.log("LKKKK", edge);

  function drawRoundedRect(ctx:any, startX:any, startY:any, endX:any, endY:any, radius:any) {
    let x = Math.min(startX, endX);
    let y = Math.min(startY, endY);
    let width = Math.abs(endX - startX);
    let height = Math.abs(endY - startY);

    ctx.beginPath();
    ctx.moveTo(x , y+radius);
    ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI);

    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 0);

    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI);

    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI);
    ctx.closePath();

     if(backgroundColor != "none" && backgroundColor){
        ctx.fillStyle = backgroundColor;
        ctx.fill();
     }

    ctx.stroke();
}

  drawRoundedRect(ctx,startX, startY, width+startX, height+startY, edge*2 );
};

export const DrawPencil = (ctx: CanvasRenderingContext2D, pencilPath: any) => {
  ctx.beginPath();
  for (let i = 1; i < pencilPath.length; i++) {
    ctx.moveTo(pencilPath[i - 1].x, pencilPath[i - 1].y);
    ctx.lineTo(pencilPath[i].x, pencilPath[i].y);
  }
  ctx.stroke();
};



// triangle


// export const DrawRectangle = (
//   ctx: CanvasRenderingContext2D,
//   startX: number,
//   startY: number,
//   width: number,
//   height: number,
//   edge: number,
//   backgroundColor?: string 
// ) => {
  
//   // if(backgroundColor != "none" && backgroundColor){
//   //   ctx.fillStyle = backgroundColor!; 
//   //   ctx.fillRect(startX, startY, width, height);
//   // }
//   // ctx.strokeRect(startX, startY, width, height);
//   // console.log("LKKKK", edge);

//   function drawRoundedRect(ctx:any, startX:any, startY:any, endX:any, endY:any, radius:any) {
//     let x = Math.min(startX, endX);
//     let y = Math.min(startY, endY);
//     let width = Math.abs(endX - startX);
//     let height = Math.abs(endY - startY);

//     ctx.beginPath();

//     // Top-left corner
//     ctx.moveTo(x , y);
//     ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI);

//     // Top-right corner
//     ctx.lineTo(x + width - radius, y);
//     ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 0);

//     // Bottom-right corner
//     // ctx.lineTo(x + width, y + height - radius);
//     // ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI);

//     // Bottom-left corner
//     ctx.lineTo(x + radius, y + height);
//     ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI);

//     ctx.closePath();
//     ctx.stroke();
// }

//   drawRoundedRect(ctx,startX, startY, width+startX, height+startY, edge*2 );
// };