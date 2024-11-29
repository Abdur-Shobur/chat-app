/* eslint-disable no-undef */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  customer_password: process.env.CUSTOMER_PASSWORD || 'password',
  supplier_password: process.env.CUSTOMER_PASSWORD || 'password',
  store_password: process.env.CUSTOMER_PASSWORD || 'password',
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.SECRET,
    expires_in: '1h',
    // expires_in: process.env.ACCESS_EXP_TIME || '1h',
    refresh_secret: process.env.REFRESH_SECRET,
    refresh_expires_in: '90d',
    // refresh_expires_in: process.env.REFRESH_EXP_TIME || '90d',
  },

  /* ==============Start===============
       this is too much sensitive
    ==============================
        * if you change you have change route name
        * change frontend all permission that use in you code 
        * this is stop edit code name and delete route for production 
        * rolePermissionModify: 'ok', ok is on , you can change it off 
      
  */
  // rolePermissionModify: 'off',
  rolePermissionModify: 'ok',
}

// =============End================
