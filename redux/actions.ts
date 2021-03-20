import * as types from './types'

export const changeFormInput = (fieldName: string, value: string) => ({
  type: types.CHANGE_FORM_INPUT,
  payload: { fieldName, value }
})

export const resetCount = () => ({ type: types.RESET })
