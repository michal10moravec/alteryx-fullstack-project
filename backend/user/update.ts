import { User } from './User'
import { hashPassword } from './helpers'
import { Database, loadDb, saveDb } from '../data/dbOperations'

/**
 * Method updates user according to the id
 * @param payload params that should be updated
 * @param loadDbFunc custom function for loading db
 * @param saveDbFunc custom function for saving db
 * @returns updated user
 */
export const updateUser = async (
  payload: Partial<User>,
  loadDbFunc?: (dbFilePath?: string | undefined) => Promise<Database>,
  saveDbFunc?: (db: Database, dbFilePath?: string | undefined) => Promise<void>
) => {
  const load = loadDbFunc ? loadDbFunc : loadDb
  const save = saveDbFunc ? saveDbFunc : saveDb

  const db = await load()

  const foundExistingEmail = db.users.find(
    (user) => user.email === payload.email
  )
  if (foundExistingEmail) throw new Error('User with this email address already exists')

  const foundUserIndex = db.users.findIndex((user) => user.id === payload.id)
  if (foundUserIndex === -1) throw new Error('User not found')
  const foundUser = db.users[foundUserIndex]

  let newPassword = foundUser.password
  //we have to generate a new password hash if there is an update in password
  if (
    payload.password &&
    (await hashPassword(payload.password)) !== foundUser.password
  ) {
    newPassword = await hashPassword(payload.password)
  }

  const sanitizedUser: User = {
    ...foundUser,
    ...payload,
    password: newPassword
  }

  db.users.splice(foundUserIndex, 1, sanitizedUser)
  await save(db)

  return sanitizedUser
}
