import { Schema, model } from "mongoose";

interface IMeetings {
  date: Date;
  startTime: string;
  endTime: string;
  room: "R1" | "R2" | "R3";
}

const meetingSchema = new Schema<IMeetings>({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    enum: {
      values: ['R1', 'R2', 'R3'],
      message : '{VALUE} is not supported'
    },
    required: true,
  },
});

export default model<IMeetings>('Meeting', meetingSchema);