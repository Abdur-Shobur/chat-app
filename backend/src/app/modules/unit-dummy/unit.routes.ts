import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { unitValidation } from './unit.validation'
import Controller from './unit.controller'
const router = express.Router()

// get all
router.get('/', Controller.index)

// store
router.post('/store', validateRequest(unitValidation), Controller.store)

// update
router.put('/update/:id', validateRequest(unitValidation), Controller.update)

// show
router.get('/:id', Controller.show)

// delete by id
router.delete('/:id', Controller.destroy)

// update status
router.put('/status/:id', Controller.updateStatus)

export const UnitRoutes = router
