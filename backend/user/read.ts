import { Database, DB_FILE_PATH } from './User'
import fs from 'fs'
import { comparePasswords } from './helpers'

/**
 * Method return user according to the user id
 * @param id user id
 */
export const getUser = async (id: number) => {
  const data = await fs.promises.readFile(DB_FILE_PATH, 'utf8')
  const db: Database = JSON.parse(data)

  const foundUser = db.users.find((user) => user.id === id)
  if (!foundUser) throw new Error('User not found')

  return foundUser
}

/**
 * Method return user according to the user email and password
 * @param email email
 * @param password password
 */
export const getUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  const data = await fs.promises.readFile(DB_FILE_PATH, 'utf8')
  const db: Database = JSON.parse(data)

  const foundUser = db.users.find(
    (user) => user.email === email && comparePasswords(user.password, password)
  )
  if (!foundUser) throw new Error('User not found')

  return foundUser
}

/**
 * Method returns all users
 */
export const getUsers = async () => {
  const data = await fs.promises.readFile(DB_FILE_PATH, 'utf8')
  const db: Database = JSON.parse(data)

  return db.users
}
