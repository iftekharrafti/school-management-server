import { Request, Response } from 'express'
import { userServices } from './user.service'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const newUser = await userServices.createUserService(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}
