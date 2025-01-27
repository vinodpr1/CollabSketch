import express from "express"
import { RoomChats } from "../../controllers";


const chatRouter:any = express.Router();


chatRouter.get("/messages", RoomChats);


export {chatRouter};