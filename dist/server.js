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
require("module-alias/register");
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const viewEngine_1 = __importDefault(require("./config/viewEngine"));
const web_1 = __importDefault(require("./route/web"));
const connectDB_1 = __importDefault(require("@config/connectDB"));
const logger_1 = require("@config/logger");
// Startup
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = (0, express_1.default)();
            logger_1.logger.info('Initializing ORM connection...');
            (0, connectDB_1.default)();
            app.use(body_parser_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.get('/test-log', (req, res) => {
                logger_1.logger.info('Loi ne', { isRequest: true, request: req });
                res.status(200).json({
                    data: 'data ne',
                });
            });
            (0, viewEngine_1.default)(app);
            (0, web_1.default)(app);
            const port = process.env.PORT || 6969;
            app.listen(port, () => {
                //callback
                console.log('Backend Nodejs is runing on the port : ' + port);
            });
        }
        catch (err) {
            logger_1.logger.error(err.stack);
        }
    });
})();
