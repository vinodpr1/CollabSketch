import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { appRoutes } from "./routes";
import {prismaClient} from "@repo/db/prismaclient";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", appRoutes);

app.listen(3200,async()=>{
   await prismaClient.user.create({data:{name:"Jay Mata ji", email:"jay@gmail.com", password:"vinod"}});
   console.log(`Server is running on PORT 3200`);
})
