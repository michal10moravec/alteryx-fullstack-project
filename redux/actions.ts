import { User } from '../backend/user/User'
import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { GlobalState } from './reducers'
import * as types from './types'

const sendRequest = async (
  endpoint: string,
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
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

export const createUser = (user: Omit<User, 'id'>): UserThunk => async (
  dispatch
) => {
  await sendRequest('/user', 'PUT', user, dispatch, types.CREATE_USER_SUCCESS)
}

export const updateUser = (user: User): UserThunk => async (dispatch) => {
  await sendRequest(
    `/user/${user.id}`,
    'POST',
    user,
    dispatch,
    types.UPDATE_USER_SUCCESS
  )
}

export const deleteUser = (userId: number): UserThunk => async (dispatch) => {
  await sendRequest(
    `/user/${userId}`,
    'DELETE',
    undefined,
    dispatch,
    types.DELETE_USER_SUCCESS
  )
}

export const changeFormInput = (fieldName: string, value: string) => ({
  type: types.CHANGE_FORM_INPUT,
  payload: { fieldName, value }
})

export const resetCount = () => ({ type: types.RESET })
