import { User } from './User'
import { generateUniqueId, hashPassword } from './helpers'
import { Database, loadDb, saveDb } from '../data/dbOperations'

export const create = async (db: Database, newUser: Omit<User, 'id'>) => {
  return {
    ...newUser,
    id: generateUniqueId(db.users),
    password: await hashPassword(newUser.password)
  }
}

/**
 * Method creates new user, stores it in a persistent storage and returns the user
 * @param newUser user object with params to create
 */
export const createUser = async (
  newUser: Omit<User, 'id'>,
  loadDbFunc?: (dbFilePath?: string | undefined) => Promise<Database>,
  saveDbFunc?: (db: Database, dbFilePath?: string | undefined) => Promise<void>
) => {
  const load = loadDbFunc ? loadDbFunc : loadDb
  const save = saveDbFunc ? saveDbFunc : saveDb

  const db = await load()
  const existingUser = db.users.find((user) => user.email === newUser.email)
  if (existingUser) throw new Error('User with this email address already exists')

  const createdUser = await create(db, newUser)
  db.users.push(createdUser)
  await save(db)

  return createdUser
}
