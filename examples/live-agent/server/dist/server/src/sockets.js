"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLiveAgentMessage = exports.disconnectLiveAgent = exports.connectLiveAgent = void 0;
/* eslint-disable import/no-relative-packages */
var socket_event_enum_1 = require("../../shared/socket-event.enum");
var connectLiveAgent = function (conversation, agent) { return ({
    type: socket_event_enum_1.SocketEvent.LIVE_AGENT_CONNECT,
    data: { conversation: conversation, agent: agent },
}); };
exports.connectLiveAgent = connectLiveAgent;
var disconnectLiveAgent = function (conversation, agent) { return ({
    type: socket_event_enum_1.SocketEvent.LIVE_AGENT_DISCONNECT,
    data: { conversation: conversation, agent: agent },
}); };
exports.disconnectLiveAgent = disconnectLiveAgent;
var sendLiveAgentMessage = function (message) { return ({
    type: socket_event_enum_1.SocketEvent.LIVE_AGENT_MESSAGE,
    data: { message: message },
}); };
exports.sendLiveAgentMessage = sendLiveAgentMessage;
