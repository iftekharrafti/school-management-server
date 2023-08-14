import mongoose from 'mongoose'
import { IGenericErrorMessages } from '../interfaces/error'

const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessages[] = [
    {
      path: err.path,
      message: 'Invalid id',
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  }
}

export default handleCastError
