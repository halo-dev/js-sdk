import * as Logger from '../'
import * as assert from 'assert'

const testLogger = Logger.createClientLogger('test')

describe('HaloLogger', function () {
  it('is not enabled', () => {
    // HaloLogger is only used to enable a way to redirect logs.
    // This test ensures logs aren't redirected to the root logger.
    // Log redirection works because all the client loggers inherit from the root logger.
    Logger.setLogLevel('debug')
    assert.ok(!Logger.HaloLogger.enabled)
  })
})

describe('setLogLevel', () => {
  it('enables all relevant loggers for debug setting', () => {
    Logger.setLogLevel('debug')
    assert.ok(testLogger.debug.enabled)
    assert.ok(testLogger.info.enabled)
    assert.ok(testLogger.warning.enabled)
    assert.ok(testLogger.error.enabled)
  })

  it('enables all relevant loggers for info setting', () => {
    Logger.setLogLevel('info')
    assert.ok(!testLogger.debug.enabled)
    assert.ok(testLogger.info.enabled)
    assert.ok(testLogger.warning.enabled)
    assert.ok(testLogger.error.enabled)
  })

  it('enables all relevant loggers for warning setting', () => {
    Logger.setLogLevel('warning')
    assert.ok(!testLogger.debug.enabled)
    assert.ok(!testLogger.info.enabled)
    assert.ok(testLogger.warning.enabled)
    assert.ok(testLogger.error.enabled)
  })

  it('enables all relevant loggers for warning setting', () => {
    Logger.setLogLevel('error')
    assert.ok(!testLogger.debug.enabled)
    assert.ok(!testLogger.info.enabled)
    assert.ok(!testLogger.warning.enabled)
    assert.ok(testLogger.error.enabled)
  })

  it('clears all relevant loggers when undefined', () => {
    Logger.setLogLevel('debug')
    assert.ok(testLogger.debug.enabled)
    assert.ok(testLogger.info.enabled)
    assert.ok(testLogger.warning.enabled)
    assert.ok(testLogger.error.enabled)

    Logger.setLogLevel(undefined)
    assert.ok(!testLogger.debug.enabled)
    assert.ok(!testLogger.info.enabled)
    assert.ok(!testLogger.warning.enabled)
    assert.ok(!testLogger.error.enabled)
  })

  it('throws when setting to an unknown log level', () => {
    assert.throws(() => {
      Logger.setLogLevel('verbose' as any)
    }, /Unknown log level/)
  })
})

describe('ClientLoggers', () => {
  it('logs to parent loggers', () => {
    Logger.setLogLevel('debug')

    const oldLog = Logger.HaloLogger.log.bind(Logger.HaloLogger)
    let called = false

    Logger.HaloLogger.log = () => {
      called = true
    }

    testLogger.info('hello')
    assert.ok(called)

    Logger.HaloLogger.log = oldLog
  })
})
