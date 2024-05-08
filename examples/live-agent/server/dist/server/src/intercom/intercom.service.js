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
exports.IntercomService = void 0;
/* eslint-disable no-await-in-loop */
var intercom_client_1 = require("intercom-client");
var string_strip_html_1 = require("string-strip-html");
var sockets_1 = require("../sockets");
var IntercomService = /** @class */ (function () {
    function IntercomService() {
        this.intercom = new intercom_client_1.Client({ tokenAuth: { token: process.env.INTERCOM_TOKEN } });
        this.conversations = new Map();
    }
    IntercomService.prototype.send = function (conversationID, event) {
        var ws = this.conversations.get(conversationID);
        ws === null || ws === void 0 ? void 0 : ws.send(JSON.stringify(event));
    };
    IntercomService.prototype.connectAgent = function (conversation) {
        return __awaiter(this, void 0, void 0, function () {
            var agent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.intercom.admins.find({ id: conversation.admin_assignee_id })];
                    case 1:
                        agent = _a.sent();
                        this.send(conversation.id, (0, sockets_1.connectLiveAgent)(conversation, agent));
                        return [2 /*return*/];
                }
            });
        });
    };
    IntercomService.prototype.disconnectAgent = function (conversation) {
        return __awaiter(this, void 0, void 0, function () {
            var agent;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.intercom.admins.find({ id: conversation.admin_assignee_id })];
                    case 1:
                        agent = _b.sent();
                        this.send(conversation.id, (0, sockets_1.disconnectLiveAgent)(conversation, agent));
                        (_a = this.conversations.get(conversation.id)) === null || _a === void 0 ? void 0 : _a.close();
                        this.conversations.delete(conversation.id);
                        return [2 /*return*/];
                }
            });
        });
    };
    IntercomService.prototype.sendAgentReply = function (conversation) {
        return __awaiter(this, void 0, void 0, function () {
            var html;
            return __generator(this, function (_a) {
                html = conversation.conversation_parts.conversation_parts.map(function (part) { return part.body; }).join('\n');
                this.send(conversation.id, (0, sockets_1.sendLiveAgentMessage)((0, string_strip_html_1.stripHtml)(html).result));
                return [2 /*return*/];
            });
        });
    };
    IntercomService.prototype.sendUserReply = function (userID, conversationID, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.intercom.conversations.replyByIdAsUser({
                            id: conversationID,
                            intercomUserId: userID,
                            body: message,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IntercomService.prototype.createConversation = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var finalUserID, existingUser, e_1, user, conversation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finalUserID = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this.intercom.contacts.find({ id: userID })];
                    case 2:
                        existingUser = _a.sent();
                        finalUserID = existingUser.id;
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this.intercom.contacts.createLead()];
                    case 4:
                        user = _a.sent();
                        finalUserID = user.id;
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, this.intercom.conversations.create({
                            userId: finalUserID,
                            body: '<strong>A Webchat user has requested to speak with a Live Agent. The following is a transcript of the conversation with the Voiceflow Assistant:</strong>',
                        })];
                    case 6:
                        conversation = _a.sent();
                        return [2 /*return*/, {
                                userID: finalUserID,
                                conversationID: conversation.conversation_id,
                            }];
                }
            });
        });
    };
    IntercomService.prototype.sendHistory = function (userID, conversationID, history) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, history_1, _a, author, text;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, history_1 = history;
                        _b.label = 1;
                    case 1:
                        if (!(_i < history_1.length)) return [3 /*break*/, 4];
                        _a = history_1[_i], author = _a.author, text = _a.text;
                        return [4 /*yield*/, this.intercom.conversations.replyByIdAsUser({
                                id: conversationID,
                                intercomUserId: userID,
                                body: "<strong>".concat(author, ":</strong> ").concat(text),
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IntercomService.prototype.subscribeToConversation = function (conversationID, ws, handler) {
        return __awaiter(this, void 0, void 0, function () {
            var conversation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.intercom.conversations.find({ id: conversationID }).catch(function () { return null; })];
                    case 1:
                        conversation = _a.sent();
                        if (!conversation)
                            return [2 /*return*/];
                        ws.on('message', function (message) { return handler(JSON.parse(message.toString())); });
                        this.conversations.set(conversationID, ws);
                        return [2 /*return*/];
                }
            });
        });
    };
    return IntercomService;
}());
exports.IntercomService = IntercomService;
