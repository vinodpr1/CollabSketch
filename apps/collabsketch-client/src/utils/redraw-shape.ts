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
