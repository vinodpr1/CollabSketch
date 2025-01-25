import express from "express";
import { userRouter } from "./user-routes";
import { roomRouter } from "./room-routes";



const apiRoutes:any = express.Router();

apiRoutes.use("/user", userRouter);
apiRoutes.use("/room", roomRouter);



export {apiRoutes}