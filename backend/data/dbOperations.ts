import { User } from '../user/User'
import fs from 'fs'
import { constants } from 'fs'

export interface Database {
  users: User[]
}

export const DB_FILE_PATH = 'backend/data/db.json'

/**
 * Check if db file exists and if it doesn't, creates it
 * @param dbFilePath path to db file
 */
export const checkIfDbExists = async (dbFilePath?: string) => {
  try {
    await fs.promises.access(dbFilePath ?? DB_FILE_PATH, constants.F_OK)
  } catch (err) {
    await saveDb({ users: [] })
  }
}

/**
 * Loads db from file
 * @param dbFilePath path to db file
 * @returns 
 */
export const loadDb = async (dbFilePath?: string): Promise<Database> => {
  await checkIfDbExists(dbFilePath)
  const data = await fs.promises.readFile(dbFilePath ?? DB_FILE_PATH, 'utf8')
  const db: Database = JSON.parse(data)
  return db
}

/**
 * Saves db to db file
 * @param db db to save
 * @param dbFilePath path to db file
 */
export const saveDb = async (db: Database, dbFilePath?: string) => {
  await fs.promises.writeFile(
    dbFilePath ?? DB_FILE_PATH,
    JSON.stringify(db, null, 2)
  )
}
