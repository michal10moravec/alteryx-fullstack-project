import { Database, DB_FILE_PATH, User } from './User'
import fs from 'fs'
import { hashPassword } from './helpers'

/**
 * Method updates user according to the id
 * @param id user id
 * @param payload params that should be updated
 */
export const updateUser = async (id: number, payload: Partial<User>) => {
  const data = await fs.promises.readFile(DB_FILE_PATH, 'utf8')
  const db: Database = JSON.parse(data)

  const foundUser = db.users.find((user) => user.id === id)
  if (!foundUser) throw new Error('User not found')

  let newPassword = foundUser.password
  //we have to generate a new password hash if there is an update in password
  if (payload.password && await hashPassword(payload.password) !== foundUser.password) {
    newPassword = await hashPassword(payload.password)
  }

  const sanitizedUser: User = {
    ...foundUser,
    ...payload,
    password: newPassword
  }

  db.users.push(sanitizedUser)
  await fs.promises.writeFile(DB_FILE_PATH, JSON.stringify(db, null, 2))

  return sanitizedUser
}