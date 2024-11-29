import config from '../config'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const log = (data: any, fileName: string): void => {
  if (config.env === 'development') {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data, null, 2), fileName + ' ==> log.ts')
  }
}
export { log }
