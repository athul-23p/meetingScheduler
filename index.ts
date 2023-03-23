import mongoose from "mongoose";
import dotevn from 'dotenv';
import express, { Express, Request, Response } from 'express';
import meetingController from './src/controllers/meeting.controller';
dotevn.config();

async function main() {
    await mongoose.connect(String(process.env.MONGO_URL));
    console.info("Connected to mongodb")
}


const app = express();
const port = 12548
app.use(express.json());
app.use('/meeting',meetingController)
app.listen(port, () => {
    console.log(`server listening on ${port}`)
    main().catch(err => console.error(err));
    
})

