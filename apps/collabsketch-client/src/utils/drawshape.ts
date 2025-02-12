import { HTTP_BACKEND_URL } from "@repo/common/HTTP_BACKEND_URL";
import axios from "axios";

interface Pencil {
  x: number;
  y: number;
}

type ExistingShape =
  | {
      id: number;
      type: "rectangle";
      color: string;
      stroke: number;
      startX: number;
      startY: number;
      width: number;
      height: number;
    }
  | {
      id: number;
      type: "ellipse";
      color: string;
      stroke: number;
      startX: number;
      startY: number;
      radius: number;
    }
  | {
      id: number;
      type: "line";
      color: string;
      stroke: number;
      startX: number;
      startY: number;
      moveX: number;
      moveY: number;
    }
  | {
      id: number;
      type: "pencil";
      color: string;
      stroke: number;
      path: any;
    }
  | {
      id: number;
      type: "arrow";
      color: string;
      stroke: number;
      startX: number;
      startY: number;
      moveX: number;
      moveY: number;
    }
  | {
      id: number;
      type: "text";
      color: string;
      stroke: number;
      startX: number;
      startY: number;
      text: string;
    };

let existingShape: ExistingShape[] = [];
let pencilPath: Pencil[] = [];

let scale = 1; // Initial scale
let minScale = 0.5;
let maxScale = 2;
let offsetX = 0;
let offsetY = 0;

const zoomFactor = 1.04; // Zoom factor (10% zoom per step)
const zoomSpeed = 0.1;

export const drawShape = (
  canvas: HTMLCanvasElement,
  socket: WebSocket,
  roomid: any,
  tool: string,
  color: string,
  stroke: number,
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  drawShapesBeforeClear(ctx, canvas, existingShape);

  let startX = 0;
  let startY = 0;
  let clicked = false;
  let selectedShape: ExistingShape | undefined;
  let slecteOffsetX = 0;
  let slecteOffsetY = 0;
  let slectedX = 0;
  let slectedY = 0;

  let TL = false;
  let TR = false;
  let BL = false;
  let BR = false;
  let ELR = false;
  let ELL = false;
  let ELT = false;
  let ELB = false;

  // Store previous event listeners to remove them properly
  const previousListeners = (canvas as any)._eventListeners || {};

  // Remove existing event listeners if they exist
  if (previousListeners.mousedown) {
    canvas.removeEventListener("mousedown", previousListeners.mousedown);
    canvas.removeEventListener("mouseup", previousListeners.mouseup);
    canvas.removeEventListener("mousemove", previousListeners.mousemove);
    canvas.removeEventListener("wheel", previousListeners.wheel);
  }

  // Define event handlers
  const handleMouseDown = (event: MouseEvent) => {
    clicked = true;
    const rect = canvas.getBoundingClientRect();
    if (tool == "select") {
      selectedShape = existingShape.find((shape) => {
        if (shape.type != "pencil") {
          slecteOffsetX = event.clientX - shape?.startX;
          slecteOffsetY = event.clientY - shape?.startY;
        }
        return findInterSection(
          event.clientX - rect.left,
          event.clientY - rect.top,
          shape,
        );
      });

      if (selectedShape) {
        document.getElementsByTagName("body")[0].style.cursor = "move";
      }

      if (selectedShape?.type == "rectangle") {
        const zoneX1 = selectedShape.startX;
        const zoneY1 = selectedShape.startY;

        const shape1 = {
          id: -1,
          type: "ellipse",
          color: color,
          stroke: stroke,
          startX: zoneX1,
          startY: zoneY1,
          radius: 20,
        };

        const shape2 = {
          id: -1,
          type: "ellipse",
          color: color,
          stroke: stroke,
          startX: zoneX1 + selectedShape.width,
          startY: zoneY1 + selectedShape.height,
          radius: 20,
        };

        const shape3 = {
          id: -1,
          type: "ellipse",
          color: color,
          stroke: stroke,
          startX: selectedShape.startX,
          startY: selectedShape.startY + selectedShape.height,
          radius: 20,
        };

        const shape4 = {
          id: -1,
          type: "ellipse",
          color: color,
          stroke: stroke,
          startX: selectedShape.startX + selectedShape.width,
          startY: selectedShape.startY,
          radius: 20,
        };

        TL = findInterSection(event.clientX, event.clientY, shape1);
        BR = findInterSection(event.clientX, event.clientY, shape2);
        TR = findInterSection(event.clientX, event.clientY, shape3);
        BL = findInterSection(event.clientX, event.clientY, shape4);

        console.log("is inside", TL, TR, BL, BR);

        if (TL || BR) {
          document.getElementsByTagName("body")[0].style.cursor = "nwse-resize";
        } else if (TR || BL) {
          document.getElementsByTagName("body")[0].style.cursor = "nesw-resize";
        }
      } else if (selectedShape?.type == "ellipse") {
        const shape1 = {
          id: -1,
          type: "ellipse",
          color: color,
          stroke: stroke,
          startX: selectedShape.startX + selectedShape.radius,
          startY: selectedShape.startY,
          radius: 5,
        };

        const shape2 = {
          id: -1,
          type: "ellipse",
          color: color,
          stroke: stroke,
          startX: selectedShape.startX - selectedShape.radius,
          startY: selectedShape.startY,
          radius: 5,
        };

        const shape3 = {
          id: -1,
          type: "ellipse",
          color: color,
          stroke: stroke,
          startX: selectedShape.startX,
          startY: selectedShape.startY + selectedShape.radius,
          radius: 5,
        };

        const shape4 = {
          id: -1,
          type: "ellipse",
          color: color,
          stroke: stroke,
          startX: selectedShape.startX,
          startY: selectedShape.startY - selectedShape.radius,
          radius: 5,
        };

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(
          selectedShape.startX + selectedShape.radius,
          selectedShape.startY,
          5,
          0,
          2 * Math.PI,
        );
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(
          selectedShape.startX - selectedShape.radius,
          selectedShape.startY,
          5,
          0,
          2 * Math.PI,
        );
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(
          selectedShape.startX,
          selectedShape.startY + selectedShape.radius,
          5,
          0,
          2 * Math.PI,
        );
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(
          selectedShape.startX,
          selectedShape.startY - selectedShape.radius,
          5,
          0,
          2 * Math.PI,
        );
        ctx.stroke();
        ctx.closePath();

        ELR = findInterSection(event.clientX, event.clientY, shape1);
        ELL = findInterSection(event.clientX, event.clientY, shape2);
        ELT = findInterSection(event.clientX, event.clientY, shape3);
        ELB = findInterSection(event.clientX, event.clientY, shape4);

        if (ELR || ELL) {
          document.getElementsByTagName("body")[0].style.cursor = "e-resize";
        } else if (ELT || ELB) {
          document.getElementsByTagName("body")[0].style.cursor = "n-resize";
        }
      }
    } else {
      startX = event.clientX - rect.left;
      startY = event.clientY - rect.top;
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    clicked = false;
    const rect = canvas.getBoundingClientRect();
    const width = event.clientX - startX - rect.left;
    const height = event.clientY - startY - rect.top;
    let shape: ExistingShape | null = null;
    if (tool === "rectangle") {
      shape = {
        id: existingShape.length,
        type: "rectangle",
        color: color,
        stroke: stroke,
        startX: startX,
        startY: startY,
        width: width,
        height: height,
      };
    } else if (tool === "ellipse") {
      const radius = Math.sqrt(width ** 2 + height ** 2);
      shape = {
        id: existingShape.length,
        type: "ellipse",
        color: color,
        stroke: stroke,
        startX: startX,
        startY: startY,
        radius: radius,
      };
    } else if (tool === "line") {
      shape = {
        id: existingShape.length,
        type: "line",
        color: color,
        stroke: stroke,
        startX: startX,
        startY: startY,
        moveX: event.clientX - rect.left,
        moveY: event.clientY - rect.top,
      };
    } else if (tool === "pencil") {
      // console.log("pencil path", pencilPath);
      shape = {
        id: existingShape.length,
        type: "pencil",
        color: color,
        stroke: 1,
        path: pencilPath,
      };
      pencilPath = [];
    } else if (tool === "arrow") {
      shape = {
        id: existingShape.length,
        type: "arrow",
        color: color,
        stroke: stroke,
        startX: startX,
        startY: startY,
        moveX: event.clientX - rect.left,
        moveY: event.clientY - rect.top,
      };
    } else if (tool == "select") {
      document.getElementsByTagName("body")[0].style.cursor = "";
      if (!selectedShape) return;
      existingShape.push(selectedShape);
      selectedShape = undefined;
    }

    if (!shape) return;
    existingShape.push(shape);

    socket.send(JSON.stringify(shape));
    socket.onmessage = (event) => {
      existingShape.push(JSON.parse(event.data));
      drawShapesBeforeClear(ctx, canvas, existingShape);
    };
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (clicked) {
      const rect = canvas.getBoundingClientRect();
      const width = event.clientX - startX - rect.left;
      const height = event.clientY - startY - rect.top;

      drawShapesBeforeClear(ctx, canvas, existingShape);
      ctx.strokeStyle = color;
      ctx.lineWidth = stroke;

      if (tool === "rectangle") {
        ctx.strokeRect(startX, startY, width, height);
      } else if (tool === "ellipse") {
        const radius = Math.sqrt(width ** 2 + height ** 2);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
      } else if (tool === "line") {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
        ctx.stroke();
        ctx.closePath();
      } else if (tool === "arrow") {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
        ctx.stroke();
        ctx.closePath();

        const arrowLen = 10;
        let dx = event.clientX - rect.left - startX;
        let dy = event.clientY - rect.top - startY;
        let angle = Math.atan2(dy, dx);

        ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
        ctx.lineTo(
          event.clientX - rect.left - arrowLen * Math.cos(angle - Math.PI / 6),
          event.clientY - rect.top - arrowLen * Math.sin(angle - Math.PI / 6),
        );
        ctx.stroke();

        ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
        ctx.lineTo(
          event.clientX - rect.left - arrowLen * Math.cos(angle + Math.PI / 6),
          event.clientY - rect.top - arrowLen * Math.sin(angle + Math.PI / 6),
        );
        ctx.stroke();
      } else if (tool === "pencil") {
        const currentX = event.clientX - rect.left;
        const currentY = event.clientY - rect.top;
        pencilPath.push({ x: currentX, y: currentY });
        ctx.beginPath();
        for (let i = 1; i < pencilPath.length; i++) {
          ctx.moveTo(pencilPath[i - 1].x, pencilPath[i - 1].y);
          ctx.lineTo(pencilPath[i].x, pencilPath[i].y);
        }
        ctx.stroke();
      } else if (tool == "eraser") {
        existingShape = existingShape.filter((shape) => {
          return !findInterSection(
            event.clientX - rect.left,
            event.clientY - rect.top,
            shape,
          );
        });
      } else if (tool == "select") {
        if (!selectedShape) return;

        existingShape = existingShape.filter((shape) => {
          return shape.id !== selectedShape?.id;
        });

        if (!TL && !TR && !BL && !BR && !ELR && !ELL && !ELT && !ELB) {
          if (selectedShape.type == "rectangle") {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;
            ctx.strokeRect(
              event.clientX - rect.left - slecteOffsetX,
              event.clientY - rect.top - slecteOffsetY,
              selectedShape.width,
              selectedShape.height,
            );
            selectedShape.startX = event.clientX - rect.left - slecteOffsetX;
            selectedShape.startY = event.clientY - rect.left - slecteOffsetY;
          } else if (selectedShape.type == "ellipse") {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;
            ctx.beginPath();
            ctx.arc(
              event.clientX - rect.left - slecteOffsetX,
              event.clientY - rect.top - slecteOffsetY,
              selectedShape.radius,
              0,
              2 * Math.PI,
            );
            ctx.stroke();
            ctx.closePath();

            selectedShape.startX = event.clientX - rect.left - slecteOffsetX;
            selectedShape.startY = event.clientY - rect.left - slecteOffsetY;
          } else if (selectedShape.type == "line") {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;
            ctx.beginPath();

            // Calculate new start and end positions based on movement
            let newStartX = event.clientX - rect.left;
            let newStartY = event.clientY - rect.top;
            let newEndX =
              newStartX + (selectedShape.moveX - selectedShape.startX);
            let newEndY =
              newStartY + (selectedShape.moveY - selectedShape.startY);

            ctx.moveTo(newStartX - slecteOffsetX, newStartY - slecteOffsetY);
            ctx.lineTo(newEndX - slecteOffsetX, newEndY - slecteOffsetY);
            ctx.stroke();
            ctx.closePath();

            // Update shape's new position
            selectedShape.startX = newStartX - slecteOffsetX;
            selectedShape.startY = newStartY - slecteOffsetY;
            selectedShape.moveX = newEndX - slecteOffsetX;
            selectedShape.moveY = newEndY - slecteOffsetY;
          } else if (selectedShape.type == "arrow") {
            console.log("Arrow is selected");

            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;
            ctx.beginPath();

            // Calculate new start and end positions based on movement
            let newStartX = event.clientX - rect.left;
            let newStartY = event.clientY - rect.top;
            let newEndX =
              newStartX + (selectedShape.moveX - selectedShape.startX);
            let newEndY =
              newStartY + (selectedShape.moveY - selectedShape.startY);

            ctx.beginPath();
            ctx.moveTo(newStartX - slecteOffsetX, newStartY - slecteOffsetY);
            ctx.lineTo(newEndX - slecteOffsetX, newEndY - slecteOffsetY);
            ctx.stroke();
            ctx.closePath();

            const arrowLen = 10;
            let dx = newEndX - newStartX;
            let dy = newEndY - newStartY;
            let angle = Math.atan2(dy, dx);

            ctx.moveTo(newEndX - slecteOffsetX, newEndY - slecteOffsetY);
            ctx.lineTo(
              newEndX -
                slecteOffsetX -
                arrowLen * Math.cos(angle - Math.PI / 6),
              newEndY -
                slecteOffsetY -
                arrowLen * Math.sin(angle - Math.PI / 6),
            );
            ctx.stroke();

            ctx.moveTo(newEndX - slecteOffsetX, newEndY - slecteOffsetY);
            ctx.lineTo(
              newEndX -
                slecteOffsetX -
                arrowLen * Math.cos(angle + Math.PI / 6),
              newEndY -
                slecteOffsetY -
                arrowLen * Math.sin(angle + Math.PI / 6),
            );

            ctx.stroke();

            // Update shape's new position
            selectedShape.startX = newStartX - slecteOffsetX;
            selectedShape.startY = newStartY - slecteOffsetY;
            selectedShape.moveX = newEndX - slecteOffsetX;
            selectedShape.moveY = newEndY - slecteOffsetY;
          }
        } else {
          if (selectedShape.type == "rectangle" && TL) {
            // console.log(selectedShape);
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;
            const x2 = selectedShape.width + selectedShape.startX;
            const y2 = selectedShape.height + selectedShape.startY;
            ctx.strokeRect(
              event.clientX,
              event.clientY,
              x2 - event.clientX,
              y2 - event.clientY,
            );

            selectedShape.startX = event.clientX;
            selectedShape.startY = event.clientY;
            selectedShape.width = x2 - event.clientX;
            selectedShape.height = y2 - event.clientY;
          } else if (selectedShape.type == "rectangle" && BR) {
            // console.log(selectedShape);
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            ctx.strokeRect(
              selectedShape.startX,
              selectedShape.startY,
              event.clientX - selectedShape.startX,
              event.clientY - selectedShape.startY,
            );

            selectedShape.width = event.clientX - selectedShape.startX;
            selectedShape.height = event.clientY - selectedShape.startY;
          } else if (selectedShape.type == "rectangle" && BL) {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            const newWidth = event.clientX - selectedShape.startX;
            const newHeight =
              selectedShape.startY + selectedShape.height - event.clientY;

            selectedShape.startY = event.clientY;
            selectedShape.width = newWidth;
            selectedShape.height = newHeight;

            ctx.strokeRect(
              selectedShape.startX,
              selectedShape.startY,
              selectedShape.width,
              selectedShape.height,
            );
          } else if (selectedShape.type == "rectangle" && TR) {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;
            const newWidth =
              selectedShape.startX + selectedShape.width - event.clientX;
            const newHeight = event.clientY - selectedShape.startY;

            selectedShape.startX = event.clientX;
            selectedShape.width = newWidth;
            selectedShape.height = newHeight;
            ctx.strokeRect(
              selectedShape.startX,
              selectedShape.startY,
              selectedShape.width,
              selectedShape.height,
            );
          } else if (selectedShape.type == "ellipse") {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            const radius = Math.sqrt(
              Math.abs(event.clientX - selectedShape.startX) ** 2 +
                Math.abs(event.clientY - selectedShape.startY) ** 2,
            );
            ctx.beginPath();
            ctx.arc(
              selectedShape.startX,
              selectedShape.startY,
              radius,
              0,
              2 * Math.PI,
            );
            ctx.stroke();
            ctx.closePath();

            selectedShape.radius = radius;
          }
        }
      }
    }
  };

  const handleZoom = (event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault(); // Prevents the page from scrolling
      const direction = event.deltaY < 0 ? "in" : "out"; // Zoom in if scrolling up, out if scrolling down
      const rect = canvas.getBoundingClientRect();

      offsetX = event.clientX - rect.left; // Get X position relative to canvas
      offsetY = event.clientY - rect.top; // Get Y position relative to canvas

      let deltaY = event?.deltaY;
      if (deltaY < 0 && scale <= maxScale) {
        zoom(direction, offsetX, offsetY, ctx, canvas); // Zoom in
        deltaY = 0;
      } else if (deltaY > 0 && scale >= minScale) {
        zoom(direction, offsetX, offsetY, ctx, canvas); // Zoom out
        deltaY = 0;
      }
    }
  };

  // Attach new event listeners
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);
  // passivw - allows preventdefault to work
  canvas.addEventListener("wheel", handleZoom, { passive: false });

  // Save new event listeners reference
  (canvas as any)._eventListeners = {
    mousedown: handleMouseDown,
    mouseup: handleMouseUp,
    mousemove: handleMouseMove,
    wheel: handleZoom,
  };
};

const findInterSection = (x: any, y: any, existingShape: any) => {
  if (existingShape.type == "pencil") {
    //  console.log("Pencil", x, y , existingShape);

    let truth = false;
    for (let i = 0; i < existingShape.path.length; i++) {
      const points = existingShape.path[i];
      console.log("Points", points);
      if (
        points.x <= x - 10 &&
        points.x + 10 >= x &&
        points.y <= y - 10 &&
        points.y + 10 >= y
      ) {
        truth = true;
      }
    }

    return truth;
  }

  if (existingShape.type == "ellipse") {
    const x1 = existingShape.startX;
    const y1 = existingShape.startY;
    const radius = existingShape.radius;
    const truth = (x - x1) ** 2 + (y - y1) ** 2 <= radius ** 2;
    return truth;
  } else if (existingShape.type == "rectangle") {
    const x1 = existingShape.startX;
    const y1 = existingShape.startY;
    const x2 = existingShape.width + existingShape.startX;
    const y2 = existingShape.height + existingShape.startY;
    const truth =
      x >= Math.min(x1, x2) &&
      x <= Math.max(x1, x2) &&
      y >= Math.min(y1, y2) &&
      y <= Math.max(y1, y2);
    return truth;
  } else {
    const x1 = existingShape.startX;
    const y1 = existingShape.startY;
    const x2 = existingShape.moveX;
    const y2 = existingShape.moveY;
    const truth =
      x >= Math.min(x1, x2) &&
      x <= Math.max(x1, x2) &&
      y >= Math.min(y1, y2) &&
      y <= Math.max(y1, y2);
    return truth;
  }
};

const drawShapesBeforeClear = (
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
      ctx.beginPath();
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.moveX, shape.moveY);
      ctx.stroke();
      ctx.closePath();

      const arrowLen = 10;
      let dx = shape.moveX - shape.startX;
      let dy = shape.moveY - shape.startY;
      let angle = Math.atan2(dy, dx);

      ctx.moveTo(shape.moveX, shape.moveY);
      ctx.lineTo(
        shape.moveX - arrowLen * Math.cos(angle - Math.PI / 6),
        shape.moveY - arrowLen * Math.sin(angle - Math.PI / 6),
      );
      ctx.stroke();

      ctx.moveTo(shape.moveX, shape.moveY);
      ctx.lineTo(
        shape.moveX - arrowLen * Math.cos(angle + Math.PI / 6),
        shape.moveY - arrowLen * Math.sin(angle + Math.PI / 6),
      );
      ctx.stroke();
    }
  });
};

const getShapes = async (roomid: any) => {
  const slug = roomid.split("%20").join(" ");
  const room = await axios.get(
    `${HTTP_BACKEND_URL}/room/slugroom?slug=${slug}`,
  );
  const chats = await axios.get(
    `${HTTP_BACKEND_URL}/chat/messages?roomid=${room.data.response.id}`,
  );
  if (!chats) return;
  const parsedChat = chats.data.chats.map((data: any) => {
    return JSON.parse(data.message);
  });
  return parsedChat;
};

const zoom = (
  direction: string,
  offsetX: number,
  offsetY: number,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
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
