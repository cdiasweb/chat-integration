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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gorgiasRoutes = void 0;
var socket_event_enum_1 = require("./socket-event.enum");
var ts_pattern_1 = require("ts-pattern");
var gorgias_service_1 = require("./gorgias.service");
var gorgiasRoutes = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    var gorgias;
    return __generator(this, function (_a) {
        gorgias = new gorgias_service_1.GorgiasService();
        // Gorgias event
        app.post("/gorgias/user/:userID/conversation/:conversationID/ticket_updated", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, userID, conversationID, webhookData, assigneeUser;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.params, userID = _a.userID, conversationID = _a.conversationID;
                        webhookData = req.body;
                        assigneeUser = (_b = webhookData === null || webhookData === void 0 ? void 0 : webhookData.ticket) === null || _b === void 0 ? void 0 : _b.assignee_user;
                        if (!assigneeUser) return [3 /*break*/, 2];
                        return [4 /*yield*/, (gorgias === null || gorgias === void 0 ? void 0 : gorgias.connectAgent(webhookData))];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        res.send('ok');
                        return [2 /*return*/];
                }
            });
        }); });
        app.post("/gorgias/user/:userID/conversation/:conversationID/ticket_message", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, userID, conversationID, webhookData, assigneeUser;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.params, userID = _a.userID, conversationID = _a.conversationID;
                        webhookData = req.body;
                        assigneeUser = (_b = webhookData === null || webhookData === void 0 ? void 0 : webhookData.ticket) === null || _b === void 0 ? void 0 : _b.assignee_user;
                        console.log('ticket message:', webhookData);
                        if (!webhookData.message.from_agent) return [3 /*break*/, 2];
                        return [4 /*yield*/, gorgias.sendAgentReply(webhookData)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        res.send('ok');
                        return [2 /*return*/];
                }
            });
        }); });
        app.ws("/gorgias/user/:userID/conversation/:conversationID/socket", function (ws, req) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, userID, conversationID;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, userID = _a.userID, conversationID = _a.conversationID;
                        console.log('Received a socket message: ', userID, conversationID, req.params, req.body);
                        return [4 /*yield*/, gorgias.subscribeToConversation(conversationID, ws, function (event) {
                                return (0, ts_pattern_1.match)(event.type)
                                    .with(socket_event_enum_1.SocketEvent.USER_MESSAGE, function () { return gorgias === null || gorgias === void 0 ? void 0 : gorgias.sendUserReply(userID, conversationID, event.data.message); })
                                    .otherwise(function () { return console.warn('unknown event', event); });
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        app.head('/gorgias', function (req, res) {
            res.send('ok');
        });
        app.post('/gorgias/conversation', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, userID, conversationID;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, gorgias.createConversation(req.body)];
                    case 1:
                        _a = _b.sent(), userID = _a.userID, conversationID = _a.conversationID;
                        res.json({ userID: userID, conversationID: conversationID });
                        return [4 /*yield*/, gorgias.sendHistory(userID, conversationID, req.body.history)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        app.ws("/socket", function (ws, req) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, userID, conversationID;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, userID = _a.userID, conversationID = _a.conversationID;
                        console.log('socket message: ', userID, conversationID);
                        return [4 /*yield*/, gorgias.subscribeToConversation(conversationID, ws, function (event) {
                                return (0, ts_pattern_1.match)(event.type)
                                    .with(socket_event_enum_1.SocketEvent.LIVE_AGENT_CONNECT, function () { return gorgias === null || gorgias === void 0 ? void 0 : gorgias.connectAgent(event.data); })
                                    .otherwise(function () { return console.warn('unknown event', event); });
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.gorgiasRoutes = gorgiasRoutes;
