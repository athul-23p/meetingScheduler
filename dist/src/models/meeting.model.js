"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const meetingSchema = new mongoose_1.Schema({
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
            message: '{VALUE} is not supported'
        },
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Meeting', meetingSchema);
