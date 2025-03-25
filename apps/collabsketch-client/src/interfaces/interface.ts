export type ExistingShape =
  | {
      id: number;
      type: "rectangle";
      color: string;
      stroke: number;
      background: string;
      startX: number;
      startY: number;
      width: number;
      height: number;
    }
  | {
      id: number;
      type: "ellipse";
      color: string;
      background: string;
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

export interface Pencil {
  x: number;
  y: number;
}
