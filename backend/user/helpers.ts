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

export const createEmptyUser = (): User => ({
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})
