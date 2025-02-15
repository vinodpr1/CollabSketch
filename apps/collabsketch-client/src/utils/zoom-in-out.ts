import { ExistingShape } from "@/interfaces/interface";
import { drawShapesBeforeClear } from "./redraw-shape";

let scale = 1; // Initial scale
let minScale = 0.5;
let maxScale = 2;
let offsetX = 0;
let offsetY = 0;

const zoomFactor = 1.04; // Zoom factor (10% zoom per step)
const zoomSpeed = 0.1;

export const zoom = (
  direction: string,
  offsetX: number,
  offsetY: number,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  existingShape: any,
) => {
  if (direction === "in") {
    scale *= zoomFactor;
  } else if (direction === "out") {
    scale /= zoomFactor;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);
  ctx.translate(-offsetX, -offsetY);
  drawShapesBeforeClear(ctx, canvas, existingShape);
  ctx.restore();
};
