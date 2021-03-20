export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface Database {
  users: User[]
}

export const DB_FILE_PATH = 'backend/data/db.json'
export const BCRYPT_SALT_ROUNDS = 10