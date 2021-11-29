import { platformDeps } from '../platform'
import { Debug, Debugger } from '../types'

const debugEnvVariable = (typeof process !== 'undefined' && process.env && process.env.DEBUG) || undefined

let enabledString: string | undefined
let enabledNamespaces: RegExp[] = []
let skippedNamespaces: RegExp[] = []
const debuggers: Debugger[] = []

if (debugEnvVariable) {
  enable(debugEnvVariable)
}

const debugObj: Debug = Object.assign(
  (namespace: string): Debugger => {
    return createDebugger(namespace)
  },
  {
    enable,
    enabled,
    disable,
    log,
  },
)

function log(...args: any[]) {
  return platformDeps.log(...args)
}

function enable(namespaces: string): void {
  enabledString = namespaces
  enabledNamespaces = []
  skippedNamespaces = []
  const wildcard = /\*/g
  const namespaceList = namespaces.split(',').map((ns) => ns.trim().replace(wildcard, '.*?'))
  for (const ns of namespaceList) {
    if (ns.startsWith('-')) {
      skippedNamespaces.push(new RegExp(`^${ns.substr(1)}$`))
    } else {
      enabledNamespaces.push(new RegExp(`^${ns}$`))
    }
  }
  for (const instance of debuggers) {
    instance.enabled = enabled(instance.namespace)
  }
}

function enabled(namespace: string): boolean {
  if (namespace.endsWith('*')) {
    return true
  }

  for (const skipped of skippedNamespaces) {
    if (skipped.test(namespace)) {
      return false
    }
  }
  for (const enabledNamespace of enabledNamespaces) {
    if (enabledNamespace.test(namespace)) {
      return true
    }
  }
  return false
}

function disable(): string {
  const result = enabledString || ''
  enable('')
  return result
}

function createDebugger(namespace: string): Debugger {
  const newDebugger: Debugger = Object.assign(debug, {
    enabled: enabled(namespace),
    destroy,
    log: debugObj.log,
    namespace,
    extend,
  })

  function debug(...args: any[]): void {
    if (!newDebugger.enabled) {
      return
    }
    if (args.length > 0) {
      args[0] = `[${namespace}] ${args[0]}`
    }
    newDebugger.log(...args)
  }

  debuggers.push(newDebugger)

  return newDebugger
}

function destroy(this: Debugger): boolean {
  const index = debuggers.indexOf(this)
  if (index >= 0) {
    debuggers.splice(index, 1)
    return true
  }
  return false
}

function extend(this: Debugger, namespace: string): Debugger {
  const newDebugger = createDebugger(`${this.namespace}:${namespace}`)
  newDebugger.log = this.log
  return newDebugger
}

export default debugObj
