"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = __importStar(require("../index"));
const assert = __importStar(require("assert"));
const testLogger = Logger.createClientLogger("test");
describe("HaloLogger", function () {
    it("is not enabled", () => {
        // HaloLogger is only used to enable a way to redirect logs.
        // This test ensures logs aren't redirected to the root logger.
        // Log redirection works because all the client loggers inherit from the root logger.
        Logger.setLogLevel("verbose");
        assert.ok(!Logger.HaloLogger.enabled);
    });
});
describe("setLogLevel", () => {
    it("enables all relevant loggers for verbose setting", () => {
        Logger.setLogLevel("verbose");
        assert.ok(testLogger.verbose.enabled);
        assert.ok(testLogger.info.enabled);
        assert.ok(testLogger.warning.enabled);
        assert.ok(testLogger.error.enabled);
    });
    it("enables all relevant loggers for info setting", () => {
        Logger.setLogLevel("info");
        assert.ok(!testLogger.verbose.enabled);
        assert.ok(testLogger.info.enabled);
        assert.ok(testLogger.warning.enabled);
        assert.ok(testLogger.error.enabled);
    });
    it("enables all relevant loggers for warning setting", () => {
        Logger.setLogLevel("warning");
        assert.ok(!testLogger.verbose.enabled);
        assert.ok(!testLogger.info.enabled);
        assert.ok(testLogger.warning.enabled);
        assert.ok(testLogger.error.enabled);
    });
    it("enables all relevant loggers for warning setting", () => {
        Logger.setLogLevel("error");
        assert.ok(!testLogger.verbose.enabled);
        assert.ok(!testLogger.info.enabled);
        assert.ok(!testLogger.warning.enabled);
        assert.ok(testLogger.error.enabled);
    });
    it("clears all relevant loggers when undefined", () => {
        Logger.setLogLevel("verbose");
        assert.ok(testLogger.verbose.enabled);
        assert.ok(testLogger.info.enabled);
        assert.ok(testLogger.warning.enabled);
        assert.ok(testLogger.error.enabled);
        Logger.setLogLevel(undefined);
        assert.ok(!testLogger.verbose.enabled);
        assert.ok(!testLogger.info.enabled);
        assert.ok(!testLogger.warning.enabled);
        assert.ok(!testLogger.error.enabled);
    });
    it("throws when setting to an unknown log level", () => {
        assert.throws(() => {
            Logger.setLogLevel("debug");
        }, /Unknown log level/);
    });
});
describe("ClientLoggers", () => {
    it("logs to parent loggers", () => {
        Logger.setLogLevel("verbose");
        const oldLog = Logger.HaloLogger.log.bind(Logger.HaloLogger);
        let called = false;
        Logger.HaloLogger.log = () => {
            called = true;
        };
        testLogger.info("hello");
        assert.ok(called);
        Logger.HaloLogger.log = oldLog;
    });
});
//# sourceMappingURL=logger.test.js.map