import { BCRYPT_SALT_ROUNDS, User } from './User'
// import bcrypt from 'bcrypt'

/**
 * Generates unique user id
 * @param users List of users
 * @returns
 */
export const generateUniqueId = (users: User[]) => {
  if (users.length === 0) {
    return 0
  } else {
    return (
      users.sort((a, b) => {
        if (a.id === b.id) return 0
        if (a.id < b.id) return -1
        else return 1
      })[users.length - 1].id + 1
    )
  }
}

export const hashPassword = (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    BCRYPT_SALT_ROUNDS
    reject
    resolve(password)
    // bcrypt.hash(password, BCRYPT_SALT_ROUNDS, (err, hash) => {
    //   if (err) return reject(err)
    //   resolve(hash)
    // })
  })

export const comparePasswords = async (
  password1: string,
  password2: string
) => {
  return password1 === password2
}

export const createEmptyUser = (): User => ({
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

export const validateUserId = (payload: any): number | false => {
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
  const userId = parseInt(userIdPayload.userId)
  if (isNaN(userId)) return false
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
