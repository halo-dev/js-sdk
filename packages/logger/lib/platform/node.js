"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const util_1 = __importDefault(require("util"));
const os_1 = require("os");
const log = (message, ...args) => {
    process.stderr.write(`${util_1.default.format(message, ...args)}${os_1.EOL}`);
};
exports.log = log;
//# sourceMappingURL=node.js.map