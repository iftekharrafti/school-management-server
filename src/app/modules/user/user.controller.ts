import { NextFunction, Request, Response } from 'express'
import { userServices } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

export const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    const newUser = await userServices.createUserService(user)
    next()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: newUser,
    })
  },
)
