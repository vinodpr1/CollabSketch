import { drawShapesBeforeClear } from "./redraw-shape";
import { checkCorner, findInterSection } from "./intersection-point";
import { zoom } from "./zoom-in-out";
import { ExistingShape, Pencil } from "@/interfaces/interface";
import { DrawEllipse, DrawLine, DrawRectangle } from "./shape";

let existingShape: ExistingShape[] = [];
let pencilPath: Pencil[] = [];
let replacePencilPath: Pencil[] = [];

let scale = 1; // Initial scale
let minScale = 0.5;
let maxScale = 2;
let offsetX = 0;
let offsetY = 0;

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
  let selectedOffsetX = 0;
  let selecteOffsetY = 0;

  let TL = false;
  let TR = false;
  let BL = false;
  let BR = false;
  let ELR = false;
  let ELL = false;
  let ELT = false;
  let ELB = false;
  let LNS = false;
  let LNE = false;
  let ARRS = false;
  let ARRE = false;

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
          selectedOffsetX = event.clientX - shape?.startX;
          selecteOffsetY = event.clientY - shape?.startY;
          return findInterSection(
            event.clientX - rect.left,
            event.clientY - rect.top,
            shape,
          )
        } 
        else {

          selectedOffsetX = event.clientX - shape?.path[0].x;
          selecteOffsetY = event.clientY - shape?.path[0].y;

          return findInterSection(
            event.clientX - rect.left,
            event.clientY - rect.top,
            shape,
            ctx
          )
        }
      });

      if (selectedShape) {
        document.getElementsByTagName("body")[0].style.cursor = "move";
        console.log("Inside just selected function", selectedShape);
      }

      if (selectedShape?.type == "rectangle") {
        console.log("Inside just selected function extra if", selectedShape);
        const zoneX1 = selectedShape.startX;
        const zoneY1 = selectedShape.startY;

        const topLeftCorner = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          zoneX1,
          zoneY1,
          15,
        );
        const bottomRightCorner = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          zoneX1 + selectedShape.width,
          zoneY1 + selectedShape.height,
          15,
        );
        const topRightCorner = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          selectedShape.startX,
          selectedShape.startY + selectedShape.height,
          15,
        );
        const bottomLeftCorner = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          selectedShape.startX + selectedShape.width,
          selectedShape.startY,
          15,
        );

        //checking pointer at every corner to resize the shape
        TL = findInterSection(event.clientX, event.clientY, topLeftCorner);
        BR = findInterSection(event.clientX, event.clientY, bottomRightCorner);
        TR = findInterSection(event.clientX, event.clientY, topRightCorner);
        BL = findInterSection(event.clientX, event.clientY, bottomLeftCorner);

        if (TL || BR || TR || BL)
          document.getElementsByTagName("body")[0].style.cursor = "pointer";
      } else if (selectedShape?.type == "ellipse") {

        const right = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          selectedShape.startX + selectedShape.radius,
          selectedShape.startY,
          15,
        );
        const left = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          selectedShape.startX - selectedShape.radius,
          selectedShape.startY,
          15,
        );
        const top = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          selectedShape.startX,
          selectedShape.startY + selectedShape.radius,
          15,
        );
        const bottom = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          selectedShape.startX,
          selectedShape.startY - selectedShape.radius,
          15,
        );

        DrawEllipse(
          ctx,
          selectedShape.startX + selectedShape.radius,
          selectedShape.startY,
          5,
          6,
        );
        DrawEllipse(
          ctx,
          selectedShape.startX - selectedShape.radius,
          selectedShape.startY,
          5,
          6,
        );
        DrawEllipse(
          ctx,
          selectedShape.startX,
          selectedShape.startY + selectedShape.radius,
          5,
          6,
        );
        DrawEllipse(
          ctx,
          selectedShape.startX,
          selectedShape.startY - selectedShape.radius,
          5,
          6,
        );

        ELR = findInterSection(event.clientX, event.clientY, right);
        ELL = findInterSection(event.clientX, event.clientY, left);
        ELT = findInterSection(event.clientX, event.clientY, top);
        ELB = findInterSection(event.clientX, event.clientY, bottom);

        if (ELR || ELL || ELT || ELB)
          document.getElementsByTagName("body")[0].style.cursor = "pointer";
      } else if (selectedShape?.type == "line") {

        DrawEllipse(ctx, selectedShape.startX, selectedShape.startY, 7, 8);
        DrawEllipse(ctx, selectedShape.moveX, selectedShape.moveY, 7, 8);

        const right = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          selectedShape.moveX,
          selectedShape.moveY,
          15,
        );
        const left = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          selectedShape.startX,
          selectedShape.startY,
          15,
        );

        LNS = findInterSection(event.clientX, event.clientY, right);
        LNE = findInterSection(event.clientX, event.clientY, left);

        if (LNS || LNE) {
          document.getElementsByTagName("body")[0].style.cursor = "pointer";
        }
      } else if (selectedShape?.type == "arrow") {

        DrawEllipse(ctx, selectedShape.startX, selectedShape.startY, 7, 8);
        DrawEllipse(ctx, selectedShape.moveX, selectedShape.moveY, 7, 8);

        const right = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          selectedShape.moveX,
          selectedShape.moveY,
          15,
        );
        const left = checkCorner(
          -1,
          "ellipse",
          color,
          stroke,
          selectedShape.startX,
          selectedShape.startY,
          15,
        );

        ARRS = findInterSection(event.clientX, event.clientY, right);
        ARRE = findInterSection(event.clientX, event.clientY, left);

        if (ARRS || ARRE) {
          document.getElementsByTagName("body")[0].style.cursor = "pointer";
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
        DrawRectangle(ctx, startX, startY, width, height);
      } else if (tool === "ellipse") {
        DrawEllipse(ctx, startX, startY, width, height);
      } else if (tool === "line") {
        DrawLine(
          ctx,
          startX,
          startY,
          event.clientX - rect.left,
          event.clientY - rect.top,
        );
      } else if (tool === "arrow") {
        DrawLine(
          ctx,
          startX,
          startY,
          event.clientX - rect.left,
          event.clientY - rect.top,
        );

        const arrowLen = 10;
        let dx = event.clientX - rect.left - startX;
        let dy = event.clientY - rect.top - startY;
        let angle = Math.atan2(dy, dx);
        // small line to show arrow
        DrawLine(
          ctx,
          event.clientX - rect.left,
          event.clientY - rect.top,
          event.clientX - rect.left - arrowLen * Math.cos(angle - Math.PI / 6),
          event.clientY - rect.top - arrowLen * Math.sin(angle - Math.PI / 6),
        );
        DrawLine(
          ctx,
          event.clientX - rect.left,
          event.clientY - rect.top,
          event.clientX - rect.left - arrowLen * Math.cos(angle + Math.PI / 6),
          event.clientY - rect.top - arrowLen * Math.sin(angle + Math.PI / 6),
        );
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

      if (
        !TL &&
        !TR &&
        !BL &&
        !BR &&
        !ELR &&
        !ELL &&
        !ELT &&
        !ELB &&
        !LNS &&
        !LNE &&
        !ARRS &&
        !ARRE
       ) {
          if (selectedShape.type == "rectangle") {

            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;
            ctx.strokeRect(
              event.clientX - rect.left - selectedOffsetX,
              event.clientY - rect.top - selecteOffsetY,
              selectedShape.width,
              selectedShape.height,
            );
            selectedShape.startX = event.clientX - rect.left - selectedOffsetX;
            selectedShape.startY = event.clientY - rect.left - selecteOffsetY;
          } else if (selectedShape.type == "ellipse") {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;
            ctx.beginPath();
            ctx.arc(
              event.clientX - rect.left - selectedOffsetX,
              event.clientY - rect.top - selecteOffsetY,
              selectedShape.radius,
              0,
              2 * Math.PI,
            );
            ctx.stroke();
            ctx.closePath();

            selectedShape.startX = event.clientX - rect.left - selectedOffsetX;
            selectedShape.startY = event.clientY - rect.left - selecteOffsetY;
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

            ctx.moveTo(newStartX - selectedOffsetX, newStartY - selecteOffsetY);
            ctx.lineTo(newEndX - selectedOffsetX, newEndY - selecteOffsetY);
            ctx.stroke();
            ctx.closePath();

            // Update shape's new position
            selectedShape.startX = newStartX - selectedOffsetX;
            selectedShape.startY = newStartY - selecteOffsetY;
            selectedShape.moveX = newEndX - selectedOffsetX;
            selectedShape.moveY = newEndY - selecteOffsetY;
          } else if (selectedShape.type == "arrow") {

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
            ctx.moveTo(newStartX - selectedOffsetX, newStartY - selecteOffsetY);
            ctx.lineTo(newEndX - selectedOffsetX, newEndY - selecteOffsetY);
            ctx.stroke();
            ctx.closePath();

            const arrowLen = 10;
            let dx = newEndX - newStartX;
            let dy = newEndY - newStartY;
            let angle = Math.atan2(dy, dx);

            ctx.moveTo(newEndX - selectedOffsetX, newEndY - selecteOffsetY);
            ctx.lineTo(
              newEndX -
              selectedOffsetX -
              arrowLen * Math.cos(angle - Math.PI / 6),
              newEndY -
              selecteOffsetY -
              arrowLen * Math.sin(angle - Math.PI / 6),
            );
            ctx.stroke();

            ctx.moveTo(newEndX - selectedOffsetX, newEndY - selecteOffsetY);
            ctx.lineTo(
              newEndX -
              selectedOffsetX -
              arrowLen * Math.cos(angle + Math.PI / 6),
              newEndY -
              selecteOffsetY -
              arrowLen * Math.sin(angle + Math.PI / 6),
            );

            ctx.stroke();

            // Update shape's new position
            selectedShape.startX = newStartX - selectedOffsetX;
            selectedShape.startY = newStartY - selecteOffsetY;
            selectedShape.moveX = newEndX - selectedOffsetX;
            selectedShape.moveY = newEndY - selecteOffsetY;
          } else if (selectedShape.type == "pencil") {

            // let minX= Infinity;
            // let minY = Infinity;
            // let maxX = -Infinity;
            // let maxY = -Infinity;
      
            // for(let i=0;i<selectedShape.path.length;i++){
            //   minX=Math.min(minX, selectedShape.path[i].x);
            //   minY=Math.min(minY, selectedShape.path[i].y);
            //   maxX=Math.max(maxX, selectedShape.path[i].x);
            //   maxY=Math.max(maxY, selectedShape.path[i].y);
            // }

            // ctx.strokeStyle="blue";
            // ctx.lineWidth=0.3;
            
            // DrawRectangle(ctx, minX, minY, maxX-minX, maxY-minY);

            // Logic to redraw a pencil
            const offsetX = event.clientX - selectedShape.path[0].x - selectedOffsetX;
            const offsetY = event.clientY - selectedShape.path[0].y - selecteOffsetY;

            ctx.strokeStyle=color;
            ctx.lineWidth=stroke;
            ctx.beginPath();

            for (let i = 1; i < selectedShape.path.length; i++) {
              const prevPoint = selectedShape.path[i - 1]  ;
              const currPoint = selectedShape.path[i] ;

              ctx.moveTo(prevPoint.x + offsetX, prevPoint.y + offsetY );
              ctx.lineTo(currPoint.x + offsetX, currPoint.y + offsetY);
              
            }

            ctx.stroke();
            console.log("Pencil shape moved", selectedShape);

          }

        } else {
          if (selectedShape.type == "rectangle" && TL) {
            // console.log(selectedShape);
            
            const x2 = selectedShape.width + selectedShape.startX;
            const y2 = selectedShape.height + selectedShape.startY;

            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            DrawRectangle(
              ctx,
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

            DrawRectangle(
              ctx,
              selectedShape.startX,
              selectedShape.startY,
              event.clientX - selectedShape.startX,
              event.clientY - selectedShape.startY,
            );

            selectedShape.width = event.clientX - selectedShape.startX;
            selectedShape.height = event.clientY - selectedShape.startY;
          } else if (selectedShape.type == "rectangle" && BL) {
           
            const newWidth = event.clientX - selectedShape.startX;
            const newHeight =
              selectedShape.startY + selectedShape.height - event.clientY;

            selectedShape.startY = event.clientY;
            selectedShape.width = newWidth;
            selectedShape.height = newHeight;

            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            DrawRectangle(
              ctx,
              selectedShape.startX,
              selectedShape.startY,
              selectedShape.width,
              selectedShape.height,
            );
          } else if (selectedShape.type == "rectangle" && TR) {
            
            const newWidth =
              selectedShape.startX + selectedShape.width - event.clientX;
            const newHeight = event.clientY - selectedShape.startY;

            selectedShape.startX = event.clientX;
            selectedShape.width = newWidth;
            selectedShape.height = newHeight;

            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            ctx.strokeRect(
              selectedShape.startX,
              selectedShape.startY,
              selectedShape.width,
              selectedShape.height,
            );
          } else if (selectedShape.type == "ellipse") {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            DrawEllipse(
              ctx,
              selectedShape.startX,
              selectedShape.startY,
              Math.abs(event.clientX - selectedShape.startX),
              Math.abs(event.clientY - selectedShape.startY),
            );
            const radius = Math.sqrt(
              Math.abs(event.clientX - selectedShape.startX) ** 2 +
              Math.abs(event.clientY - selectedShape.startY) ** 2,
            );

            selectedShape.radius = radius;
          } else if (selectedShape.type == "line" && LNS) {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            DrawLine(
              ctx,
              selectedShape.startX,
              selectedShape.startY,
              event.clientX - rect.left,
              event.clientY - rect.top,
            );

            selectedShape.moveX = event.clientX - rect.left;
            selectedShape.moveY = event.clientY - rect.top;
          } else if (selectedShape.type == "line" && LNE) {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            DrawLine(
              ctx,
              selectedShape.moveX,
              selectedShape.moveY,
              event.clientX - rect.left,
              event.clientY - rect.top,
            );

            selectedShape.startX = event.clientX - rect.left;
            selectedShape.startY = event.clientY - rect.top;
          } else if (selectedShape.type == "arrow" && ARRS) {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            DrawLine(
              ctx,
              selectedShape.startX,
              selectedShape.startY,
              event.clientX - rect.left,
              event.clientY - rect.top,
            );

            const arrowLen = 10;
            let dx = event.clientX - rect.left - selectedShape.startX;
            let dy = event.clientY - rect.top - selectedShape.startY;
            let angle = Math.atan2(dy, dx);

            DrawLine(
              ctx,
              event.clientX - rect.left,
              event.clientY - rect.top,
              event.clientX -
              rect.left -
              arrowLen * Math.cos(angle - Math.PI / 6),
              event.clientY -
              rect.top -
              arrowLen * Math.sin(angle - Math.PI / 6),
            );
            DrawLine(
              ctx,
              event.clientX - rect.left,
              event.clientY - rect.top,
              event.clientX -
              rect.left -
              arrowLen * Math.cos(angle + Math.PI / 6),
              event.clientY -
              rect.top -
              arrowLen * Math.sin(angle + Math.PI / 6),
            );

            selectedShape.moveX = event.clientX - rect.left;
            selectedShape.moveY = event.clientY - rect.top;
          } else if (selectedShape.type == "arrow" && ARRE) {
            ctx.strokeStyle = selectedShape.color;
            ctx.lineWidth = selectedShape.stroke;

            DrawLine(
              ctx,
              selectedShape.moveX,
              selectedShape.moveY,
              event.clientX - rect.left,
              event.clientY - rect.top,
            );

            const arrowLen = 10;
            let dx = selectedShape.moveX - selectedShape.startX;
            let dy = selectedShape.moveY - selectedShape.startY;
            let angle = Math.atan2(dy, dx);

            DrawLine(
              ctx,
              selectedShape.moveX,
              selectedShape.moveY,
              selectedShape.moveX - arrowLen * Math.cos(angle - Math.PI / 6),
              selectedShape.moveY - arrowLen * Math.sin(angle - Math.PI / 6),
            );
            DrawLine(
              ctx,
              selectedShape.moveX,
              selectedShape.moveY,
              selectedShape.moveX - arrowLen * Math.cos(angle + Math.PI / 6),
              selectedShape.moveY -
              rect.top -
              arrowLen * Math.sin(angle + Math.PI / 6),
            );

            selectedShape.startX = event.clientX - rect.left;
            selectedShape.startY = event.clientY - rect.top;
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
        zoom(direction, offsetX, offsetY, ctx, canvas, existingShape); // Zoom in
        deltaY = 0;
      } else if (deltaY > 0 && scale >= minScale) {
        zoom(direction, offsetX, offsetY, ctx, canvas, existingShape); // Zoom out
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
