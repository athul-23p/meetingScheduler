"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const meeting_model_1 = __importDefault(require("../models/meeting.model"));
const Router = express_1.default.Router();
Router.post("/schedule", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { date, startTime, endTime, room } = req.body;
        if (startTime >= endTime) {
            res.status(200).send("startTime should be less than endTime");
            return;
        }
        date = (0, moment_1.default)(date, "DD/MM/YYYY").toLocaleString();
        // check for conflicts
        let queryResult = yield meeting_model_1.default.find({ room, date })
            .where("startTime")
            .gte(startTime)
            .lte(endTime)
            .exec();
        console.log({ queryResult });
        if (queryResult.length > 0) {
            res
                .status(200)
                .send(`Room ${room} is not free during ${startTime} & ${endTime} on${date}`);
            return;
        }
        // add meeting
        const meeting = new meeting_model_1.default({
            date,
            startTime,
            endTime,
            room,
        });
        yield meeting.save();
        res.json(meeting);
    }
    catch (error) {
        console.error(error === null || error === void 0 ? void 0 : error.message);
        res.status(400).send("Bad request");
    }
}));
exports.default = Router;
