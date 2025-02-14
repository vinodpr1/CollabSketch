export const findInterSection = (x: any, y: any, existingShape: any) => {
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
  