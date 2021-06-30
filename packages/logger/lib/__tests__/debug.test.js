"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("../debug"));
const sinon_1 = require("sinon");
const chai_1 = require("chai");
describe("debug", function () {
    let logger;
    let logStub;
    function expectedTestMessage(namespace, message) {
        return `${namespace} ${message}`;
    }
    beforeEach(() => {
        logger = debug_1.default("test");
        logStub = sinon_1.stub(logger, "log");
    });
    afterEach(() => {
        logStub.restore();
        logger.destroy();
        debug_1.default.disable();
    });
    it("logs when enabled", () => {
        debug_1.default.enable("test");
        chai_1.assert.isTrue(logger.enabled);
        const testMessage = "halo is good!";
        logger(testMessage);
        chai_1.assert.isTrue(logStub.calledOnceWith(expectedTestMessage("test", testMessage)));
    });
    it("does not log when not enabled", () => {
        const testMessage = "halo is good!";
        logger(testMessage);
        chai_1.assert.isTrue(logStub.notCalled);
    });
    it("stops logging after being disabled", () => {
        debug_1.default.enable("test");
        chai_1.assert.isTrue(logger.enabled);
        const testMessage = "halo is good!";
        logger(testMessage);
        chai_1.assert.isTrue(logStub.calledOnceWith(expectedTestMessage("test", testMessage)));
        chai_1.assert.strictEqual(debug_1.default.disable(), "test", "disable should return the list of what was enabled");
        chai_1.assert.isFalse(logger.enabled);
        logger(testMessage);
        chai_1.assert.isTrue(logStub.calledOnce, "Logger should not have been called a second time.");
    });
    it("extend() creates a new namespace", () => {
        const subLogger = logger.extend("foo");
        chai_1.assert.strictEqual(subLogger.namespace, "test:foo");
        debug_1.default.enable("test:foo");
        const testMessage = "hello world!";
        logger(testMessage);
        subLogger(testMessage);
        chai_1.assert.isTrue(logStub.calledOnceWith(expectedTestMessage("test:foo", testMessage)));
    });
    it("enable() handles a csv list", () => {
        debug_1.default.enable("test,test2");
        chai_1.assert.isTrue(debug_1.default.enabled("test"));
        chai_1.assert.isTrue(debug_1.default.enabled("test2"));
    });
    it("enable() supports wildcards", () => {
        const subLogger = logger.extend("foo");
        debug_1.default.enable("test:*");
        chai_1.assert.isTrue(subLogger.enabled);
        const testMessage = "hello world!";
        subLogger(testMessage);
        chai_1.assert.isTrue(logStub.calledOnceWith(expectedTestMessage("test:foo", testMessage)));
    });
    it("enable() supports the global wildcard", () => {
        debug_1.default.enable("*");
        chai_1.assert.isTrue(debug_1.default.enabled("test"));
        chai_1.assert.isTrue(debug_1.default.enabled("bar"));
    });
    it("enable() supports skips", () => {
        debug_1.default.enable("*,-test:*");
        chai_1.assert.isTrue(debug_1.default.enabled("bar"));
        chai_1.assert.isFalse(debug_1.default.enabled("test:foo"));
    });
    it("names ending in * are always enabled", () => {
        chai_1.assert.isTrue(debug_1.default.enabled("foo*"));
    });
});
//# sourceMappingURL=debug.test.js.map