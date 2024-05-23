"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var instance = axios_1.default.create({
    baseURL: process.env.BASE_URL,
    headers: {
        authorization: "Basic ".concat(process.env.GORGIAS_CREDENTIALS),
    },
});
exports.default = instance;