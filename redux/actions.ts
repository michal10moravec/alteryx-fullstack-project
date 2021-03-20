import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { GlobalState } from './reducers'
import * as types from './types'

const sendRequest = async (
  endpoint: string,
  method: 'GET' | 'PUT' | 'DELETE',
  payload: any,
  dispatch: ThunkDispatch<GlobalState, unknown, Action<string>>,
  successType: string
) => {
  dispatch({ type: types.LOADING })
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json'
    },
    method,
    body: payload ? JSON.stringify(payload) : undefined
  })

  if (response.ok && response.status === 200) {
    const data = await response.json()
    dispatch({ type: successType, payload: data })
  } else {
    const error = await response.text()
    dispatch({ type: types.ERROR, payload: error })
  }
}

type UserThunk = ThunkAction<void, GlobalState, unknown, Action<string>>

export const getUsers = (): UserThunk => async (dispatch) => {
  await sendRequest(
    '/users',
    'GET',
    undefined,
    dispatch,
    types.LOAD_USERS_SUCCESS
  )
}

export const createUser = (): UserThunk => async (dispatch, getState) => {
  await sendRequest(
    '/user',
    'PUT',
    getState().form,
    dispatch,
    types.CREATE_USER_SUCCESS
  )
}

export const changeFormInput = (fieldName: string, value: string) => ({
  type: types.CHANGE_FORM_INPUT,
  payload: { fieldName, value }
})

export const resetCount = () => ({ type: types.RESET })
