import util from 'util'
import { EOL } from 'os'

export const log = (message: unknown, ...args: any[]) => {
  process.stderr.write(`${util.format(message, ...args)}${EOL}`)
}
