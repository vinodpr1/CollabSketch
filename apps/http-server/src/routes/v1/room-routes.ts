import express from "express"
import { CreateRoom, GetRooms } from "../../controllers";

const roomRouter:any = express.Router();


roomRouter.post("/create", CreateRoom);
roomRouter.get("/rooms", GetRooms);


export {roomRouter};