import { User } from './User'

export const validateUserId = (payload: any): number | false => {
  if (!payload) return false
  const userId = parseInt(payload.userId)
  return isNaN(userId) ? false : userId
}

export const validateCreateInputs = (
  payload: any
): Omit<User, 'id'> | false => {
  if (
    payload &&
    payload.firstName &&
    payload.lastName &&
    payload.email &&
    payload.password
  ) {
    return {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password
    }
  }

  return false
}

export const validateUpdateInputs = (
  userIdPayload: any,
  dataPayload: any
): User | false => {
  const userId = validateUserId(userIdPayload)
  if (userId === false) return false
  if (
    dataPayload &&
    dataPayload.firstName &&
    dataPayload.lastName &&
    dataPayload.email
  ) {
    return {
      id: userId,
      firstName: dataPayload.firstName,
      lastName: dataPayload.lastName,
      email: dataPayload.email,
      password: dataPayload.password
    }
  }
  return false
}
