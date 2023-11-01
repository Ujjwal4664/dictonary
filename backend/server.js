import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {wordRouter} from "./wordroute.js"
const app = express()
app.use(express.json())
app.use(cors());
app.use("/word",wordRouter)
mongoose.connect(
  "mongodb+srv://programjourney:programjourney@gameapp.rw1mwga.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.listen(5000,()=>console.log("server started"))
export default app
