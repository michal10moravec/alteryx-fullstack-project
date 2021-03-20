import { Database, DB_FILE_PATH } from './User'
import fs from 'fs'

/**
 * Method deletes user from db and returns his id
 * @param id user id
 */
export const deleteUser = async (id: number) => {
  const data = await fs.promises.readFile(DB_FILE_PATH, 'utf8')
  const db: Database = JSON.parse(data)

  const foundUserIndex = db.users.findIndex((user) => user.id === id)
  if (foundUserIndex === -1) throw new Error('User not found')

  db.users.splice(foundUserIndex, 1)

  await fs.promises.writeFile(DB_FILE_PATH, JSON.stringify(db, null, 2))

  return id
}
