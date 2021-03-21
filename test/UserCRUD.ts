import { expect } from 'chai'
import { Database } from '../backend/data/dbOperations'
import { createUser } from '../backend/user/create'
import { getUser, getUsers } from '../backend/user/read'
import { updateUser } from '../backend/user/update'
import { deleteUser } from '../backend/user/delete'
import { User } from '../backend/user/User'

const payload: User = {
  id: 0,
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'pass'
}

const updatedPayload: User = { ...payload, firstName: 'Michael' }

let users: User[] = []
const loadDbMock = async () => ({ users })
const saveDbMock = async (db: Database) => {
  users = db.users
}

describe('User CRUD', () => {
  it('should create user', async () => {
    const user = await createUser(payload, loadDbMock, saveDbMock)

    expect(payload).to.be.deep.equal(user)
    expect(users).to.have.lengthOf(1)
    expect(users).to.deep.include(user)
  })

  it('should read user', async () => {
    const user = await getUser(0, loadDbMock)

    expect(payload).to.be.deep.equal(user)
    expect(users).to.have.lengthOf(1)
  })

  it('should throw an error when trying to read non-existent user', async () => {
    try {
      await getUser(1, loadDbMock)
    } catch (err) {
      expect(err.message).to.be.equal('User not found')
    }
  })

  it('should read users', async () => {
    const users = await getUsers(loadDbMock)

    expect(users).to.have.lengthOf(1)
  })

  it('should update user', async () => {
    const user = await updateUser(updatedPayload, loadDbMock, saveDbMock)

    expect(updatedPayload).to.be.deep.equal(user)
    expect(users).to.have.lengthOf(1)
  })

  it('should throw an error when trying to update non-existent user', async () => {
    try {
      await updateUser({ ...updatedPayload, id: 1 }, loadDbMock, saveDbMock)
    } catch (err) {
      expect(err.message).to.be.equal('User not found')
    }
  })

  it('should delete user', async () => {
    const userId = await deleteUser(0, loadDbMock, saveDbMock)

    expect(userId).to.be.equal(0)
    expect(users).to.have.lengthOf(0)
  })

  it('should throw an error when trying to delete non-existent user', async () => {
    try {
      await deleteUser(0, loadDbMock, saveDbMock)
    } catch (err) {
      expect(err.message).to.be.equal('User not found')
    }
  })
})
