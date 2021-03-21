import { expect } from 'chai'
import { validateCreateInputs } from '../backend/user/validators'

const incorrectPayload = {
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'pass'
}

const payload = {
  ...incorrectPayload,
  firstName: 'John',
}

const payloadExtra = {
  ...payload,
  id: 0,
  extraKey: 'extra',
  extraKey2: 10
}

describe('Validate Create Inputs', () => {
  it('should validate correct input', async () => {
    const validatedUser = validateCreateInputs(payload)
    expect(validatedUser).to.be.deep.equal(payload)
  })

  it('should validate correct input containing extra keys and return correct user object', async () => {
    const validatedUser = validateCreateInputs(payloadExtra)
    expect(validatedUser).to.be.deep.equal(payload)
  })

  it('should not validate incorrect input (missing some keys)', async () => {
    const validatedUser = validateCreateInputs(incorrectPayload)
    expect(validatedUser).to.be.equal(false)
  })

  it('should not validate incorrect input (empty input)', async () => {
    const validatedUser = validateCreateInputs(undefined)
    expect(validatedUser).to.be.equal(false)
  })

  it('should not validate incorrect input (input is not a object)', async () => {
    const validatedUser = validateCreateInputs('error')
    expect(validatedUser).to.be.equal(false)
  })
})
