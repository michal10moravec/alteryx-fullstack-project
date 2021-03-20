import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { GlobalState } from './reducers'
import * as types from './types'

export const loadUsers = (): ThunkAction<
  void,
  GlobalState,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({ type: types.DATA_LOADING })
  const response = await fetch('http://localhost:3000/users')
  if (response.ok && response.status === 200) {
    const users = await response.json()
    dispatch({ type: types.DATA_SUCCESS, payload: users })
  } else {
    const error = await response.text()
    dispatch({ type: types.DATA_ERROR, payload: error })
  }
}

export const changeFormInput = (fieldName: string, value: string) => ({
  type: types.CHANGE_FORM_INPUT,
  payload: { fieldName, value }
})

export const resetCount = () => ({ type: types.RESET })
