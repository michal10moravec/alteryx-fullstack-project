import { User } from '../user/User'
import fs from 'fs'

export interface Database {
  users: User[]
}

export const DB_FILE_PATH = 'backend/data/db.json'

export const loadDb = async (dbFilePath?: string): Promise<Database> => {
  const data = await fs.promises.readFile(dbFilePath ?? DB_FILE_PATH, 'utf8')
  const db: Database = JSON.parse(data)
  return db
}

export const saveDb = async (db: Database, dbFilePath?: string) => {
  await fs.promises.writeFile(
    dbFilePath ?? DB_FILE_PATH,
    JSON.stringify(db, null, 2)
  )
}
