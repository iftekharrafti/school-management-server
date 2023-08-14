import { NextFunction, Request, Response } from 'express'
import { userServices } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { IUser } from './user.interface'

const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    const newUser = await userServices.createUserService(user)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: newUser,
    })
    next()
  },
)

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, ['searchTerm', 'role'])
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])

    const result = await userServices.getAllUser(filters, paginationOptions)

    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  },
)

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await userServices.getSingleUser(id)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully',
      data: result,
    })
    next()
  },
)

export const userController = {
  createUserController,
  getAllUser,
  getSingleUser,
}
