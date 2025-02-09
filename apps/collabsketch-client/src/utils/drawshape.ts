import { HTTP_BACKEND_URL } from "@repo/common/HTTP_BACKEND_URL";
import axios from "axios";
import { useEffect } from "react";

interface Pencil {
    x: number,
    y: number
}

type ExistingShape = | {
    type: "rectangle",
    color: string,
    stroke: number,
    startX: number,
    startY: number,
    width: number,
    height: number
} | {
    type: "ellipse",
    color: string,
    stroke: number,
    startX: number,
    startY: number,
    radius: number,
} | {
    type: "line",
    color: string,
    stroke: number,
    startX: number,
    startY: number,
    moveX: number,
    moveY: number
} | {
    type: "pencil",
    color: string,
    stroke: number,
    path: any;
} | {
    type: "arrow",
    color: string,
    stroke: number,
    startX: number,
    startY: number,
    moveX: number,
    moveY: number
} | {
    type: "text",
    color: string,
    stroke: number,
    startX: number,
    startY: number,
    text: string
};



let existingShape: ExistingShape[] = [];
let pencilPath: Pencil[] = [];

export const drawShape = async (
    canvas: HTMLCanvasElement,
    socket: WebSocket,
    roomid: any,
    tool: string,
    color: string,
    stroke: number
) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    let startX = 0;
    let startY = 0;
    let clicked = false;

    // Store previous event listeners to remove them properly
    const previousListeners = (canvas as any)._eventListeners || {};

    // Remove existing event listeners if they exist
    if (previousListeners.mousedown) {
        canvas.removeEventListener("mousedown", previousListeners.mousedown);
        canvas.removeEventListener("mouseup", previousListeners.mouseup);
        canvas.removeEventListener("mousemove", previousListeners.mousemove);
    }

    // Define event handlers
    const handleMouseDown = (event: MouseEvent) => {
        clicked = true;
        const rect = canvas.getBoundingClientRect();
        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
    };

    const handleMouseUp = (event: MouseEvent) => {
        clicked = false;
        const rect = canvas.getBoundingClientRect();
        let width = event.clientX - startX - rect.left;
        let height = event.clientY - startY - rect.top;
        let shape: ExistingShape | null = null;
        if (tool === "rectangle") {
            shape = {
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
                type: "ellipse",
                color: color,
                stroke: stroke,
                startX: startX,
                startY: startY,
                radius: radius,
            };
        } else if (tool === "line") {
            shape = {
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
            shape = { type: "pencil", color: color, stroke: 1, path: pencilPath };
            pencilPath = [];

        } else if (tool === "arrow") {
            shape = {
                type: "arrow",
                color: color,
                stroke: stroke,
                startX: startX,
                startY: startY,
                moveX: event.clientX - rect.left,
                moveY: event.clientY - rect.top,
            };
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
            let width = event.clientX - startX - rect.left;
            let height = event.clientY - startY - rect.top;

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

                let arrowLen = 10;
                var dx = event.clientX - rect.left - startX;
                var dy = event.clientY - rect.top - startY;
                var angle = Math.atan2(dy, dx);
                ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
                ctx.lineTo(event.clientX - rect.left - arrowLen * Math.cos(angle - Math.PI / 6), event.clientY - rect.top - arrowLen * Math.sin(angle - Math.PI / 6));
                ctx.stroke();
                ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
                ctx.lineTo(event.clientX - rect.left - arrowLen * Math.cos(angle + Math.PI / 6), event.clientY - rect.top - arrowLen * Math.sin(angle + Math.PI / 6));
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
            }
            else if (tool == "eraser") {
                existingShape = existingShape.filter((shape) => {
                    return !findInterSection(event.clientX-rect.left, event.clientY-rect.top, shape);
                });
            }
        }
    };


    // Attach new event listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    // Save new event listeners reference
    (canvas as any)._eventListeners = {
        mousedown: handleMouseDown,
        mouseup: handleMouseUp,
        mousemove: handleMouseMove,
    };
};


const findInterSection = (x: any, y: any, existingShape: any) => {
    if (existingShape.type == "pencil") {
        //  console.log("Pencil", x, y , existingShape);

        let truth = false;
        for (let i = 0; i < existingShape.path.length; i++) {
            const points = existingShape.path[i];
            console.log("Points", points);
            if (points.x <= x - 10 && points.x + 10 >= x && points.y <= y - 10 && points.y + 10 >= y) {
                truth = true;
            }
        };

        return truth;
    }

    if (existingShape.type == "ellipse") {
        const x1 = existingShape.startX;
        const y1 = existingShape.startY;
        const radius = existingShape.radius;
        const truth = (x - x1) ** 2 + (y - y1) ** 2 <= radius ** 2;
        return truth;
    }
    else if (existingShape.type == "rectangle") {
        const x1 = existingShape.startX;
        const y1 = existingShape.startY;
        const x2 = existingShape.width + existingShape.startX;
        const y2 = existingShape.height + existingShape.startY;
        const truth = x >= Math.min(x1, x2) && x <= Math.max(x1, x2) && y >= Math.min(y1, y2) && y <= Math.max(y1, y2);
        return truth;
    }
    else {
        const x1 = existingShape.startX;
        const y1 = existingShape.startY;
        const x2 = existingShape.moveX;
        const y2 = existingShape.moveY;
        const truth = x >= Math.min(x1, x2) && x <= Math.max(x1, x2) && y >= Math.min(y1, y2) && y <= Math.max(y1, y2);
        return truth;
    }
}

const drawShapesBeforeClear = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, existingShape: ExistingShape[]) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    existingShape.map((shape: ExistingShape) => {
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.stroke;
        if (shape.type == "rectangle") {
            ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        }
        else if (shape.type == "ellipse") {
            ctx.beginPath();
            ctx.arc(shape.startX, shape.startY, shape.radius, 0, 2 * Math.PI); // Circle centered at (100, 100) with radius 50
            ctx.lineWidth = shape.stroke;
            ctx.stroke();
            ctx.closePath();
        }
        else if (shape.type == "line") {
            ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.moveX, shape.moveY);
            ctx.stroke();
            ctx.closePath();
        }
        else if (shape.type == "pencil") {
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

            let arrowLen = 10;
            var dx = shape.moveX - shape.startX;
            var dy = shape.moveY - shape.startY;
            var angle = Math.atan2(dy, dx);

            ctx.moveTo(shape.moveX, shape.moveY);
            ctx.lineTo(shape.moveX - arrowLen * Math.cos(angle - Math.PI / 6), shape.moveY - arrowLen * Math.sin(angle - Math.PI / 6));
            ctx.stroke();

            ctx.moveTo(shape.moveX, shape.moveY);
            ctx.lineTo(shape.moveX - arrowLen * Math.cos(angle + Math.PI / 6), shape.moveY - arrowLen * Math.sin(angle + Math.PI / 6));
            ctx.stroke();
        }

    })
}

const getShapes = async (roomid: any) => {
    const slug = roomid.split("%20").join(" ");
    const room = await axios.get(`${HTTP_BACKEND_URL}/room/slugroom?slug=${slug}`);
    const chats = await axios.get(`${HTTP_BACKEND_URL}/chat/messages?roomid=${room.data.response.id}`);
    if (!chats) return;
    const parsedChat = chats.data.chats.map((data: any) => {
        return JSON.parse(data.message);
    })
    return parsedChat;
}

