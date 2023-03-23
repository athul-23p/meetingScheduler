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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const meeting_controller_1 = __importDefault(require("./src/controllers/meeting.controller"));
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(String(process.env.MONGO_URL));
        console.info("Connected to mongodb");
    });
}
const app = (0, express_1.default)();
const port = 12548;
app.use(express_1.default.json());
app.use('/meeting', meeting_controller_1.default);
app.listen(port, () => {
    console.log(`server listening on ${port}`);
    main().catch(err => console.error(err));
});
