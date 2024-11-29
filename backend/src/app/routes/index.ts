import express from 'express'
import { RouteList } from '../modules'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/user',
    route: RouteList.UserRoutes,
  },
  {
    path: '/auth',
    route: RouteList.AuthRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
