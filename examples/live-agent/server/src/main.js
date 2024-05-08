"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var express_ws_1 = __importDefault(require("express-ws"));
var https_1 = __importDefault(require("https"));
var fs_1 = __importDefault(require("fs"));
var gorgias_routes_1 = require("./gorgias/gorgias.routes");
var server = (0, express_ws_1.default)((0, express_1.default)());
var httpsServer = null;
if (process.env.ENVIRONMENT === 'production') {
    var expressApp = (0, express_1.default)();
    var sslOptions = {
        key: fs_1.default.readFileSync('/etc/letsencrypt/live/chatbot-farmapiel.com/privkey.pem'),
        cert: fs_1.default.readFileSync('/etc/letsencrypt/live/chatbot-farmapiel.com/cert.pem'),
    };
    // Set up HTTPS server
    httpsServer = https_1.default.createServer(sslOptions, expressApp);
    server = (0, express_ws_1.default)(expressApp, httpsServer);
}
var app = server.app;
// Increase limit to 10MB (adjust as needed)
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    next();
});
(0, gorgias_routes_1.gorgiasRoutes)(app);
// Https config
if (process.env.ENVIRONMENT === 'production' && httpsServer) {
    // Start the HTTPS server on port 443
    httpsServer.listen(443, function () {
        console.log('HTTPS server with WebSockets is running on port 443');
    });
}
else {
    app.listen(9099, '0.0.0.0');
    console.log('server is running on port 9099 for all domains');
}
