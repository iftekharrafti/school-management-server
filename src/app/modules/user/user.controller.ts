import { NextFunction, Request, Response } from 'express'
import { userServices } from './user.service'

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.body
    const newUser = await userServices.createUserService(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    })
  } catch (err) {
    next(err)
  }
}
