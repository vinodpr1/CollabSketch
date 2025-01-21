import express from "express";
import { apiRoutes } from "./v1";


const appRoutes:any = express.Router();

appRoutes.use("/v1", apiRoutes);


export {appRoutes}