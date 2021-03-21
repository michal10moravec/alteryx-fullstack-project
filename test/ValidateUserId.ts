import { expect } from 'chai'
import { validateUserId } from '../backend/user/validators'

describe('Validate User Id', () => {
  it('should validate number user id', async () => {
    const validatedUserId = validateUserId({ userId: 100 })
    expect(validatedUserId).to.be.equal(100)
  })

  it('should validate string user id', async () => {
    const validatedUserId = validateUserId({ userId: '100' })
    expect(validatedUserId).to.be.equal(100)
  })

  it('should not validate incorrect user id (not a number)', async () => {
    const validatedUserId = validateUserId({ userId: 'error' })
    expect(validatedUserId).to.be.equal(false)
  })

  it('should not validate incorrect user id (huge number)', async () => {
    const validatedUserId = validateUserId({ userId: 10e400 })
    expect(validatedUserId).to.be.equal(false)
  })

  it('should not validate incorrect user id (incorrect input)', async () => {
    const validatedUserId = validateUserId('100')
    expect(validatedUserId).to.be.equal(false)
  })

  it('should not validate incorrect user id (empty input)', async () => {
    const validatedUserId = validateUserId(undefined)
    expect(validatedUserId).to.be.equal(false)
  })
})
