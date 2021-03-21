import { Database, loadDb } from '../data/dbOperations'
import { comparePasswords } from './helpers'

/**
 * Method returns user according to the user id
 * @param id user id
 */
export const getUser = async (
  id: number,
  loadDbFunc?: (dbFilePath?: string | undefined) => Promise<Database>
) => {
  const load = loadDbFunc ? loadDbFunc : loadDb

  const db = await load()

  const foundUser = db.users.find((user) => user.id === id)
  if (!foundUser) throw new Error('User not found')

  return foundUser
}

/**
 * Method returns user according to the user email and password
 * @param email email
 * @param password password
 */
export const getUserByEmailAndPassword = async (
  email: string,
  password: string,
  loadDbFunc?: (dbFilePath?: string | undefined) => Promise<Database>
) => {
  const load = loadDbFunc ? loadDbFunc : loadDb
  const db = await load()

  const foundUser = db.users.find((user) => user.email === email)
  if (!foundUser) throw new Error('User not found')
  if (!(await comparePasswords(password, foundUser.password))) {
    throw new Error('Wrong password')
  }

  return foundUser
}

/**
 * Method returns all users
 */
export const getUsers = async (
  loadDbFunc?: (dbFilePath?: string | undefined) => Promise<Database>
) => {
  const load = loadDbFunc ? loadDbFunc : loadDb
  const db = await load()

  return db.users
}
