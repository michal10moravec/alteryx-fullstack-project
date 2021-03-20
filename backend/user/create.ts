import { Database, DB_FILE_PATH, User } from './User'
import fs from 'fs'
import { generateUniqueId, hashPassword } from './helpers'

/**
 * Method creates new user, stores it in a persistent storage and returns the user
 * @param newUser user object with params to create
 */
export const createUser = async (newUser: Omit<User, 'id'>) => {
  const data = await fs.promises.readFile(DB_FILE_PATH, 'utf8')
  const db: Database = JSON.parse(data)

  const sanitizedUser: User = {
    ...newUser,
    id: generateUniqueId(db.users),
    password: await hashPassword(newUser.password)
  }
  db.users.push(sanitizedUser)
  await fs.promises.writeFile(DB_FILE_PATH, JSON.stringify(db, null, 2))

  return sanitizedUser
}
