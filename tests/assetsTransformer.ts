import * as path from 'path'

export const process = (src: any, filename: string, config: any, options: any) => {
  return `module.exports = ${JSON.stringify(path.basename(filename))};`
}
