import debug from './debug'
import { Debugger } from '../types'

const registeredLoggers = new Set<HaloDebugger>()
const logLevelFromEnv = (typeof process !== 'undefined' && process.env && process.env.HALO_LOG_LEVEL) || undefined

let haloLogLevel: HaloLogLevel | undefined

/**
 * The HaloLogger provides a mechanism for overriding where logs are output to.
 * By default, logs are sent to stderr.
 * Override the `log` method to redirect logs to another location.
 */
export const HaloLogger: HaloClientLogger = debug('halo')
HaloLogger.log = (...args) => {
  debug.log(...args)
}

/**
 * The log levels supported by the logger.
 * The log levels in order of most verbose to least verbose are:
 * - debug
 * - info
 * - warning
 * - error
 */
export type HaloLogLevel = 'debug' | 'info' | 'warning' | 'error'
const HALO_LOG_LEVELS = ['debug', 'info', 'warning', 'error']

type HaloDebugger = Debugger & { level: HaloLogLevel }

/**
 * An HaloClientLogger is a function that can log to an appropriate severity level.
 */
export type HaloClientLogger = Debugger

if (logLevelFromEnv) {
  // avoid calling setLogLevel because we don't want a mis-set environment variable to crash
  if (isHaloLogLevel(logLevelFromEnv)) {
    setLogLevel(logLevelFromEnv)
  } else {
    console.error(
      `HALO_LOG_LEVEL set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${HALO_LOG_LEVELS.join(
        ', ',
      )}.`,
    )
  }
}

/**
 * Immediately enables logging at the specified log level.
 * @param level - The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - debug
 * - info
 * - warning
 * - error
 */
export function setLogLevel(level?: HaloLogLevel): void {
  if (level && !isHaloLogLevel(level)) {
    throw new Error(`Unknown log level '${level}'. Acceptable values: ${HALO_LOG_LEVELS.join(',')}`)
  }
  haloLogLevel = level

  const enabledNamespaces = []
  for (const logger of registeredLoggers) {
    if (shouldEnable(logger)) {
      enabledNamespaces.push(logger.namespace)
    }
  }

  debug.enable(enabledNamespaces.join(','))
}

/**
 * Retrieves the currently specified log level.
 */
export function getLogLevel(): HaloLogLevel | undefined {
  return haloLogLevel
}

const levelMap = {
  debug: 400,
  info: 300,
  warning: 200,
  error: 100,
}

/**
 * Defines the methods available on the SDK-facing logger.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface HaloLogger {
  /**
   * Used for failures the program is unlikely to recover from,
   * such as Out of Memory.
   */
  error: Debugger
  /**
   * Used when a function fails to perform its intended task.
   * Usually this means the function will throw an exception.
   * Not used for self-healing events (e.g. automatic retry)
   */
  warning: Debugger
  /**
   * Used when a function operates normally.
   */
  info: Debugger
  /**
   * Used for detailed trbouleshooting scenarios. This is
   * intended for use by developers / system administrators
   * for diagnosing specific failures.
   */
  debug: Debugger
}

/**
 * Creates a logger for use by the Halo SDKs that inherits from `HaloLogger`.
 * @param namespace - The name of the SDK package.
 */
export function createClientLogger(namespace: string): HaloLogger {
  const clientRootLogger: HaloClientLogger = HaloLogger.extend(namespace)
  patchLogMethod(HaloLogger, clientRootLogger)
  return {
    error: createLogger(clientRootLogger, 'error'),
    warning: createLogger(clientRootLogger, 'warning'),
    info: createLogger(clientRootLogger, 'info'),
    debug: createLogger(clientRootLogger, 'debug'),
  }
}

function patchLogMethod(parent: HaloClientLogger, child: HaloClientLogger | HaloDebugger): void {
  child.log = (...args) => {
    parent.log(...args)
  }
}

function createLogger(parent: HaloClientLogger, level: HaloLogLevel): HaloDebugger {
  const logger: HaloDebugger = Object.assign(parent.extend(level), {
    level,
  })

  patchLogMethod(parent, logger)

  if (shouldEnable(logger)) {
    const enabledNamespaces = debug.disable()
    debug.enable(enabledNamespaces + ',' + logger.namespace)
  }

  registeredLoggers.add(logger)

  return logger
}

function shouldEnable(logger: HaloDebugger): boolean {
  if (haloLogLevel && levelMap[logger.level] <= levelMap[haloLogLevel]) {
    return true
  } else {
    return false
  }
}

function isHaloLogLevel(logLevel: string): logLevel is HaloLogLevel {
  return HALO_LOG_LEVELS.includes(logLevel as any)
}
