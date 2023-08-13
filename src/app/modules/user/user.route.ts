import express from 'express'
import { createUserController } from './user.controller'
import { UserValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.crateUserZodSchema),
  createUserController,
)

export default router
