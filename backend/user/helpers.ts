import { User } from './User'
// export const BCRYPT_SALT_ROUNDS = 10
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
  new Promise((resolve, _reject) => {
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
