import { ExistingShape } from "@/interfaces/interface";
import { DrawEllipse, DrawLine, DrawPencil, DrawRectangle } from "./shape";
import { getArrowLength } from "./getArrowLength";
export const drawShapesBeforeClear = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  existingShape: ExistingShape[],
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  existingShape.map((shape: ExistingShape) => {
    ctx.strokeStyle = shape.color;
    ctx.lineWidth = shape.stroke;
    if (shape.type == "rectangle") {
      DrawRectangle(ctx, shape.startX, shape.startY, shape.width, shape.height,shape.edge, shape.background);
    } else if (shape.type == "ellipse") {
      DrawEllipse(
        ctx,
        shape.startX,
        shape.startY,
        shape.radius,
        0,
        2 * Math.PI,
      );
    } else if (shape.type == "line") {
      DrawLine(ctx, shape.startX, shape.startY, shape.moveX, shape.moveY);
    } else if (shape.type == "pencil") {
      DrawPencil(ctx, shape.path);
    } else if (shape.type == "arrow") {
      DrawLine(ctx, shape.startX, shape.startY, shape.moveX, shape.moveY);

      const arrowLen = getArrowLength(shape.stroke);
      let dx = shape.moveX - shape.startX;
      let dy = shape.moveY - shape.startY;
      let angle = Math.atan2(dy, dx);
      // small line to show arrow
      DrawLine(
        ctx,
        shape.moveX,
        shape.moveY,
        shape.moveX - arrowLen * Math.cos(angle - Math.PI / 6),
        shape.moveY - arrowLen * Math.sin(angle - Math.PI / 6),
      );
      DrawLine(
        ctx,
        shape.moveX,
        shape.moveY,
        shape.moveX - arrowLen * Math.cos(angle + Math.PI / 6),
        shape.moveY - arrowLen * Math.sin(angle + Math.PI / 6),
      );
    }
  });
};





export const drawSelectionOutline=(ctx: CanvasRenderingContext2D, shape: ExistingShape)=> {
  ctx.save();
  ctx.strokeStyle = '#00a8ff';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  
  if (shape.type === "rectangle") {
    ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
  } else if (shape.type === "ellipse") {
    ctx.beginPath();
    ctx.ellipse(shape.startX, shape.startY, shape.radius, shape.radius, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else if (shape.type === "line" || shape.type === "arrow") {
    ctx.beginPath();
    ctx.moveTo(shape.startX, shape.startY);
    ctx.lineTo(shape.moveX, shape.moveY);
    ctx.stroke();
  } else if (shape.type === "pencil") {
    if (shape.path.length > 0) {
      ctx.beginPath();
      ctx.moveTo(shape.path[0].x, shape.path[0].y);
      for (let i = 1; i < shape.path.length; i++) {
        ctx.lineTo(shape.path[i].x, shape.path[i].y);
      }
      ctx.stroke();
    }
  }
  
  ctx.restore();
}