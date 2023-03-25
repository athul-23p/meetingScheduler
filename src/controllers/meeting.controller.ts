import express, { Request, Response } from "express";
import moment from "moment";
import Meeting from "../models/meeting.model";

const Router = express.Router();

Router.post("/schedule", async (req: Request, res: Response) => {
  try {
    let { date, startTime, endTime, room } = req.body;

    if (startTime >= endTime) {
      res.status(200).send("startTime should be less than endTime");
      return;
    }
    date = moment(date, "DD/MM/YYYY").toLocaleString();
    // check for conflicts
    let queryResult = await Meeting.find({ room, date })
      .where("startTime")
      .gte(startTime)
      .lte(endTime)
      .exec();

    console.log({ queryResult });
    if (queryResult.length > 0) {
      res
        .status(200)
        .send(
          `Room ${room} is not free during ${startTime} & ${endTime} on${date}`
        );
      return;
    }
    // add meeting
    const meeting = new Meeting({
      date,
      startTime,
      endTime,
      room,
    });
    await meeting.save();
    res.json(meeting);
  } catch (error: any) {
    console.error(error?.message);
    res.status(400).send("Bad request");
  }
});

Router.get('/', async (req: Request, res: Response) => {
  try {
    let { room, date } = req.query as any;
    if (date == null) date = Date.now().toLocaleString();
    console.log({ room, date })
    date =  moment(date, "DD-MM-YYYY")
    let queryResult = await Meeting.find({ room }).exec();
    res.status(200).json(queryResult);
  } catch (error: any) {
    console.error(error?.message);
    res.status(400).send("Bad request");
    
  }
})
export default Router;
