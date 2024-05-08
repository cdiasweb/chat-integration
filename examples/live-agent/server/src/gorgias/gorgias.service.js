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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GorgiasService = void 0;
var axios_1 = __importDefault(require("../axios"));
var sockets_1 = require("../sockets");
var GorgiasService = /** @class */ (function () {
    function GorgiasService() {
        this.conversations = new Map();
        this.conversationsAssigned = new Map();
        this.userData = new Map();
    }
    GorgiasService.prototype.send = function (conversationID, event) {
        var ws = this.conversations.get(String(conversationID));
        console.log('FOUND WS: ', conversationID, !!ws);
        ws === null || ws === void 0 ? void 0 : ws.send(JSON.stringify(event));
    };
    GorgiasService.prototype.connectAgent = function (conversation) {
        return __awaiter(this, void 0, void 0, function () {
            var agent, conversationID;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                agent = {
                    name: (_c = (_b = (_a = conversation === null || conversation === void 0 ? void 0 : conversation.ticket) === null || _a === void 0 ? void 0 : _a.assignee_user) === null || _b === void 0 ? void 0 : _b.firstname) !== null && _c !== void 0 ? _c : 'Agent',
                };
                conversationID = (_e = (_d = conversation === null || conversation === void 0 ? void 0 : conversation.ticket) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : '';
                console.log('Connect Agent: ', agent, ' Conversation ID: ', conversationID);
                // Check if already assigned
                if (this.conversationsAssigned.get(conversationID)) {
                    console.warn('Agent already assigned to conversation ID: ', conversationID);
                    return [2 /*return*/];
                }
                this.conversationsAssigned.set(conversationID, true);
                this.send(conversationID, (0, sockets_1.connectLiveAgent)(conversation, agent));
                return [2 /*return*/];
            });
        });
    };
    GorgiasService.prototype.disconnectAgent = function (conversation) {
        return __awaiter(this, void 0, void 0, function () {
            var agent;
            var _a;
            return __generator(this, function (_b) {
                agent = 'hardcoded';
                this.send(conversation.id, (0, sockets_1.disconnectLiveAgent)(conversation, agent));
                (_a = this.conversations.get(conversation.id)) === null || _a === void 0 ? void 0 : _a.close();
                this.conversations.delete(conversation.id);
                return [2 /*return*/];
            });
        });
    };
    GorgiasService.prototype.sendAgentReply = function (conversation) {
        return __awaiter(this, void 0, void 0, function () {
            var conversationID, message;
            return __generator(this, function (_a) {
                conversationID = conversation.ticket.id;
                message = conversation.message.text;
                this.send(conversationID, (0, sockets_1.sendLiveAgentMessage)(message));
                return [2 /*return*/];
            });
        });
    };
    GorgiasService.prototype.sendUserReply = function (userID, conversationID, message) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, userEmail, userName;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('sendUserReply', message, userID, conversationID);
                        userData = this.userData.get(String(userID));
                        userEmail = (_a = userData === null || userData === void 0 ? void 0 : userData.email) !== null && _a !== void 0 ? _a : 'support@test.com';
                        userName = (_b = userData === null || userData === void 0 ? void 0 : userData.name) !== null && _b !== void 0 ? _b : 'user_name@test.com';
                        return [4 /*yield*/, this.sendUserMessageToTicket(userEmail, userName, conversationID, message)];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GorgiasService.prototype.createConversation = function (conversationData) {
        return __awaiter(this, void 0, void 0, function () {
            var name, email, ticket, customerID;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        name = (_a = conversationData === null || conversationData === void 0 ? void 0 : conversationData.name) !== null && _a !== void 0 ? _a : 'Empty name';
                        email = (_b = conversationData === null || conversationData === void 0 ? void 0 : conversationData.email) !== null && _b !== void 0 ? _b : 'empty@email.com';
                        console.log(name, email);
                        return [4 /*yield*/, this.createTicket(name, email, conversationData.history)];
                    case 1:
                        ticket = _c.sent();
                        customerID = ticket.customer.id;
                        this.userData.set(String(customerID), {
                            email: email,
                            name: name,
                        });
                        console.log(this.userData);
                        return [2 /*return*/, {
                                userID: customerID,
                                conversationID: ticket.id,
                            }];
                }
            });
        });
    };
    GorgiasService.prototype.sendHistory = function (userID, conversationID, history) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, history_1, _a, author, text;
            return __generator(this, function (_b) {
                for (_i = 0, history_1 = history; _i < history_1.length; _i++) {
                    _a = history_1[_i], author = _a.author, text = _a.text;
                    console.log('SEND HISTORY: ', author, text);
                }
                return [2 /*return*/];
            });
        });
    };
    GorgiasService.prototype.subscribeToConversation = function (conversationID, ws, handler) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ws.on('message', function (message) { return handler(JSON.parse(message.toString())); });
                this.conversations.set(conversationID, ws);
                return [2 /*return*/];
            });
        });
    };
    GorgiasService.prototype.createCustomer = function (name, email) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post('/customer', {
                            name: name,
                            email: email,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    GorgiasService.prototype.createTicket = function (name, email, messages) {
        return __awaiter(this, void 0, void 0, function () {
            var history, _i, messages_1, message, data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        history = [];
                        for (_i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                            message = messages_1[_i];
                            history.push({
                                sender: {
                                    email: email,
                                    name: name,
                                },
                                body_text: message.text,
                                channel: 'api',
                                from_agent: false,
                                subject: "from: ".concat(name),
                                via: 'api',
                            });
                        }
                        data = {
                            customer: {
                                name: name,
                                email: email,
                            },
                            messages: history,
                            tags: [
                                {
                                    name: 'Chatbot ticket',
                                },
                            ],
                            channel: 'api',
                            from_agent: false,
                            status: 'open',
                            via: 'api',
                        };
                        return [4 /*yield*/, axios_1.default.post('/tickets', data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    GorgiasService.prototype.sendUserMessageToTicket = function (userEmail, userName, conversationID, textMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var message, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = {
                            channel: 'api',
                            from_agent: false,
                            sender: {
                                email: userEmail,
                                name: userName,
                            },
                            source: {
                                type: 'api',
                            },
                            via: 'api',
                            body_text: textMessage,
                        };
                        return [4 /*yield*/, axios_1.default.post("/tickets/".concat(conversationID, "/messages?action=force"), message)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    return GorgiasService;
}());
exports.GorgiasService = GorgiasService;
