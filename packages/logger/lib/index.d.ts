import { Debugger } from "./debug";
export { Debugger } from "./debug";
/**
 * The HaloLogger provides a mechanism for overriding where logs are output to.
 * By default, logs are sent to stderr.
 * Override the `log` method to redirect logs to another location.
 */
export declare const HaloLogger: HaloClientLogger;
/**
 * The log levels supported by the logger.
 * The log levels in order of most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
export declare type HaloLogLevel = "verbose" | "info" | "warning" | "error";
/**
 * An HaloClientLogger is a function that can log to an appropriate severity level.
 */
export declare type HaloClientLogger = Debugger;
/**
 * Immediately enables logging at the specified log level.
 * @param level - The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
export declare function setLogLevel(level?: HaloLogLevel): void;
/**
 * Retrieves the currently specified log level.
 */
export declare function getLogLevel(): HaloLogLevel | undefined;
/**
 * Defines the methods available on the SDK-facing logger.
 */
export interface HaloLogger {
    /**
     * Used for failures the program is unlikely to recover from,
     * such as Out of Memory.
     */
    error: Debugger;
    /**
     * Used when a function fails to perform its intended task.
     * Usually this means the function will throw an exception.
     * Not used for self-healing events (e.g. automatic retry)
     */
    warning: Debugger;
    /**
     * Used when a function operates normally.
     */
    info: Debugger;
    /**
     * Used for detailed trbouleshooting scenarios. This is
     * intended for use by developers / system administrators
     * for diagnosing specific failures.
     */
    verbose: Debugger;
}
/**
 * Creates a logger for use by the Halo SDKs that inherits from `HaloLogger`.
 * @param namespace - The name of the SDK package.
 * @hidden
 */
export declare function createClientLogger(namespace: string): HaloLogger;
