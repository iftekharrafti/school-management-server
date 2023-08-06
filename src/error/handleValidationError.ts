import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessages } from './../interfaces/error'
import mongoose from 'mongoose'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  //
  const errors: IGenericErrorMessages[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    },
  )
  const statusCode = 500
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
