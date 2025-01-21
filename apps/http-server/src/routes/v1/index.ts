import express from "express";
import { userRouter } from "./user-routes";



const apiRoutes:any = express.Router();

apiRoutes.use("/user", userRouter);



export {apiRoutes}