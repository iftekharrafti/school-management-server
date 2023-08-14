import express from 'express'
import { userController } from './user.controller'
import { UserValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.crateUserZodSchema),
  userController.createUserController,
)

router.get('/:id', userController.getSingleUser)

router.get('/', userController.getAllUser)

export default router
