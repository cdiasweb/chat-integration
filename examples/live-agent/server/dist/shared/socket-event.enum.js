"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvent = void 0;
var SocketEvent;
(function (SocketEvent) {
    // server-sent events
    SocketEvent["LIVE_AGENT_CONNECT"] = "live_agent.connect";
    SocketEvent["LIVE_AGENT_DISCONNECT"] = "live_agent.disconnect";
    SocketEvent["LIVE_AGENT_MESSAGE"] = "live_agent.message";
    // client-sent events
    SocketEvent["USER_MESSAGE"] = "user.message";
})(SocketEvent || (exports.SocketEvent = SocketEvent = {}));
