import { ExistingShape } from "@/interfaces/interface";
import { DrawLine } from "./shape";
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
      ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
    } else if (shape.type == "ellipse") {
      ctx.beginPath();
      ctx.arc(shape.startX, shape.startY, shape.radius, 0, 2 * Math.PI); // Circle centered at (100, 100) with radius 50
      ctx.lineWidth = shape.stroke;
      ctx.stroke();
      ctx.closePath();
    } else if (shape.type == "line") {
      ctx.beginPath();
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.moveX, shape.moveY);
      ctx.stroke();
      ctx.closePath();
    } else if (shape.type == "pencil") {
      ctx.beginPath();

      for (let i = 1; i < shape.path.length; i++) {
        ctx.moveTo(shape.path[i - 1].x, shape.path[i - 1].y);
        ctx.lineTo(shape.path[i].x, shape.path[i].y);
      }
      ctx.stroke();
      ctx.closePath();
    } else if (shape.type == "arrow") {

      DrawLine(
        ctx,
        shape.startX, 
        shape.startY,
        shape.moveX,
        shape.moveY
      );

      const arrowLen = 10;
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
