import { SortOrder } from 'mongoose'
import config from '../../../config'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
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
type IOptionsType = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}
const getAllUser = async (
  filters: { searchTerm: string },
  options: IOptionsType,
) => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []
  const userSearchableFields = ['role']

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         role: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ]

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  // Total documents
  const total = await User.countDocuments()

  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await User.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  return {
    meta: {
      page,
      total,
      limit,
      skip,
    },
    data: result,
  }
}

const getSingleUser = async (id: string) => {
  const result = await User.findById(id)
  return result
}

export const userServices = {
  createUserService,
  getAllUser,
  getSingleUser,
}
