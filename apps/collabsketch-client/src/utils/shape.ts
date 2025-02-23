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
) => {
  ctx.strokeRect(startX, startY, width, height);
};
