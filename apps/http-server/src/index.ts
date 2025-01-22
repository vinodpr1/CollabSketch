import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { appRoutes } from "./routes";


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", appRoutes);

app.listen(3200,async()=>{
   console.log(`Server is running on PORT 3200`);
})
