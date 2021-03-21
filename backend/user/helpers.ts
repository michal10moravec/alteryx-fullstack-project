import { User } from './User'
export const BCRYPT_SALT_ROUNDS = 10
import bcrypt from 'bcryptjs'

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

/**
 * Generates a hash for the specified password and returns it
 * @param password password to hash
 * @returns hashed pasword
 */
export const hashPassword = (password: string): Promise<string> =>
  new Promise((resolve, _reject) => {
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, (err, hash) => {
      if (err) return _reject(err)
      resolve(hash)
    })
  })

/**
 * Compares unhashed password with a hashed one
 * @param password unhashed password
 * @param encryptedPassword hashed pasword
 * @returns true if passwords match, false otherwise
 */
export const comparePasswords = (
  password: string,
  encryptedPassword: string
): Promise<boolean> =>
  new Promise((resolve, _reject) => {
    bcrypt.compare(password, encryptedPassword, (err, same) => {
      if (err) return _reject(err)
      resolve(same)
    })
  })

  /**
   * Creates empty user object
   * @returns empty user object
   */
export const createEmptyUser = (): User => ({
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})
