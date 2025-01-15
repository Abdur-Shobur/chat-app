import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { messageValidation } from './message.validation'
import Controller from './message.controller'
const router = express.Router()

// get all
router.get('/', Controller.index)

// store
router.post('/store', validateRequest(messageValidation), Controller.store)

// update
router.put('/update/:id', validateRequest(messageValidation), Controller.update)

// show
router.get('/:id', Controller.show)

// delete by id
router.delete('/:id', Controller.destroy)

// update status
router.put('/status/:id', Controller.updateStatus)

export const MessageRoutes = router
