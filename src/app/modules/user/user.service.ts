import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUserService = async (user: IUser) => {
  const id = await generateUserId()
  user.id = id

  if (!user.password) {
    user.password = config.password as string
  }

  const createdUser = await User.create(user)
  return createdUser
}

export const userServices = {
  createUserService,
}
