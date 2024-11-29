import config from '../config'
import { statusCodes } from '../interfaces/error'
import ApiError from './ApiError'

/* where is use 
----------------
    * dev name controller 
        * store
        * update
        * destroy
        * developerPermission
    * dev name controller 
        * update  // if condition is not ok

      
    * Permission  controller
        * store
        * update
        * destroy
        * developerPermission 
        * 
    * Permission  service
        * update  // if condition is not ok


*/
export const notWork = (): void => {
  if (config.rolePermissionModify !== 'ok') {
    throw new ApiError(statusCodes.NOT_FOUND.code, 'Not Working!')
  }
}
