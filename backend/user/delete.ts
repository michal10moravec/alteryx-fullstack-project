import { Database, loadDb, saveDb } from '../data/dbOperations'

/**
 * Method deletes user from db and returns his id
 * @param id user id
 * @param loadDbFunc custom function for loading db
 * @param saveDbFunc custom function for saving db
 * @returns id of deleted user
 */
export const deleteUser = async (
  id: number,
  loadDbFunc?: (dbFilePath?: string | undefined) => Promise<Database>,
  saveDbFunc?: (db: Database, dbFilePath?: string | undefined) => Promise<void>
) => {
  const load = loadDbFunc ? loadDbFunc : loadDb
  const save = saveDbFunc ? saveDbFunc : saveDb

  const db = await load()

  const foundUserIndex = db.users.findIndex((user) => user.id === id)
  if (foundUserIndex === -1) throw new Error('User not found')

  db.users.splice(foundUserIndex, 1)

  await save(db)

  return id
}
