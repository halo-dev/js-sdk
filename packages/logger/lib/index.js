"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientLogger = exports.getLogLevel = exports.setLogLevel = exports.HaloLogger = void 0;
const debug_1 = __importDefault(require("./debug"));
const registeredLoggers = new Set();
const logLevelFromEnv = (typeof process !== "undefined" &&
    process.env &&
    process.env.HALO_LOG_LEVEL) ||
    undefined;
let haloLogLevel;
/**
 * The HaloLogger provides a mechanism for overriding where logs are output to.
 * By default, logs are sent to stderr.
 * Override the `log` method to redirect logs to another location.
 */
exports.HaloLogger = debug_1.default("halo");
exports.HaloLogger.log = (...args) => {
    debug_1.default.log(...args);
};
const HALO_LOG_LEVELS = ["verbose", "info", "warning", "error"];
if (logLevelFromEnv) {
    // avoid calling setLogLevel because we don't want a mis-set environment variable to crash
    if (isHaloLogLevel(logLevelFromEnv)) {
        setLogLevel(logLevelFromEnv);
    }
    else {
        console.error(`HALO_LOG_LEVEL set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${HALO_LOG_LEVELS.join(", ")}.`);
    }
}
/**
 * Immediately enables logging at the specified log level.
 * @param level - The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
function setLogLevel(level) {
    if (level && !isHaloLogLevel(level)) {
        throw new Error(`Unknown log level '${level}'. Acceptable values: ${HALO_LOG_LEVELS.join(",")}`);
    }
    haloLogLevel = level;
    const enabledNamespaces = [];
    for (const logger of registeredLoggers) {
        if (shouldEnable(logger)) {
            enabledNamespaces.push(logger.namespace);
        }
    }
    debug_1.default.enable(enabledNamespaces.join(","));
}
exports.setLogLevel = setLogLevel;
/**
 * Retrieves the currently specified log level.
 */
function getLogLevel() {
    return haloLogLevel;
}
exports.getLogLevel = getLogLevel;
const levelMap = {
    verbose: 400,
    info: 300,
    warning: 200,
    error: 100,
};
/**
 * Creates a logger for use by the Halo SDKs that inherits from `HaloLogger`.
 * @param namespace - The name of the SDK package.
 * @hidden
 */
function createClientLogger(namespace) {
    const clientRootLogger = exports.HaloLogger.extend(namespace);
    patchLogMethod(exports.HaloLogger, clientRootLogger);
    return {
        error: createLogger(clientRootLogger, "error"),
        warning: createLogger(clientRootLogger, "warning"),
        info: createLogger(clientRootLogger, "info"),
        verbose: createLogger(clientRootLogger, "verbose"),
    };
}
exports.createClientLogger = createClientLogger;
function patchLogMethod(parent, child) {
    child.log = (...args) => {
        parent.log(...args);
    };
}
function createLogger(parent, level) {
    const logger = Object.assign(parent.extend(level), {
        level,
    });
    patchLogMethod(parent, logger);
    if (shouldEnable(logger)) {
        const enabledNamespaces = debug_1.default.disable();
        debug_1.default.enable(enabledNamespaces + "," + logger.namespace);
    }
    registeredLoggers.add(logger);
    return logger;
}
function shouldEnable(logger) {
    if (haloLogLevel && levelMap[logger.level] <= levelMap[haloLogLevel]) {
        return true;
    }
    else {
        return false;
    }
}
function isHaloLogLevel(logLevel) {
    return HALO_LOG_LEVELS.includes(logLevel);
}
//# sourceMappingURL=index.js.map