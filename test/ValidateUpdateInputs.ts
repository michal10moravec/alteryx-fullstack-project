import { expect } from 'chai'
import { validateUpdateInputs } from '../backend/user/validators'

const incorrectPayload = {
  lastName: 'Doe',
  email: 'johndoe@gmail.com'
}

const payload = {
  ...incorrectPayload,
  id: 0,
  firstName: 'John'
}

const payloadPass = {
  ...payload,
  password: 'pass'
}

const payloadExtra = {
  ...payloadPass,
  extraKey: 'extra',
  extraKey2: 10
}

describe('Validate Update Inputs', () => {
  it('should validate correct input', async () => {
    const validatedUser = validateUpdateInputs({ userId: payload.id }, payload)
    expect(validatedUser).to.be.deep.equal({ ...payload, password: undefined })
  })

  it('should validate correct input with password', async () => {
    const validatedUser = validateUpdateInputs(
      { userId: payloadPass.id },
      payloadPass
    )
    expect(validatedUser).to.be.deep.equal(payloadPass)
  })

  it('should validate correct input containing extra keys and return correct user object', async () => {
    const validatedUser = validateUpdateInputs(
      { userId: payloadExtra.id },
      payloadExtra
    )
    expect(validatedUser).to.be.deep.equal(payloadPass)
  })

  it('should not validate incorrect input (missing some keys)', async () => {
    const validatedUser = validateUpdateInputs(
      { userId: payload.id },
      incorrectPayload
    )
    expect(validatedUser).to.be.equal(false)
  })

  it('should not validate incorrect input (empty input)', async () => {
    const validatedUser = validateUpdateInputs(
      { userId: payload.id },
      undefined
    )
    expect(validatedUser).to.be.equal(false)
  })

  it('should not validate incorrect input (input is not a object)', async () => {
    const validatedUser = validateUpdateInputs({ userId: payload.id }, 'error')
    expect(validatedUser).to.be.equal(false)
  })

  it('should not validate incorrect input (userId not a number)', async () => {
    const validatedUser = validateUpdateInputs({ userId: 'error' }, payload)
    expect(validatedUser).to.be.equal(false)
  })

  it('should not validate incorrect input (userId undefined)', async () => {
    const validatedUser = validateUpdateInputs(undefined, payload)
    expect(validatedUser).to.be.equal(false)
  })
  
  it('should not validate incorrect input (both inputs undefined)', async () => {
    const validatedUser = validateUpdateInputs(undefined, undefined)
    expect(validatedUser).to.be.equal(false)
  })
})
