import { User } from '../backend/user/User'
import { AnyAction, Reducer } from 'redux'
import * as types from './types'

export interface Form {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type StatusType = 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR'

export interface GlobalState {
  status: StatusType
  errorMessage: string
  successMessage: string
  user: User | undefined
  users: User[]
}

export const initialState: GlobalState = {
  status: 'INIT',
  errorMessage: '',
  successMessage: '',
  user: undefined,
  users: []
}

const updateUser = (users: User[], updatedUser: User) => {
  const usersCopy = [...users]
  usersCopy.splice(
    usersCopy.findIndex((user) => user.id === updatedUser.id),
    1,
    updatedUser
  )
  return usersCopy
}

const deleteUser = (users: User[], userId: number) => {
  const usersCopy = [...users]
  usersCopy.splice(
    usersCopy.findIndex((user) => user.id === userId),
    1
  )
  return usersCopy
}

export const reducer: Reducer<GlobalState, AnyAction> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.LOADING:
      return {
        ...state,
        status: 'LOADING'
      }
    case types.ERROR:
      return {
        ...state,
        status: 'ERROR',
        errorMessage: payload
      }
    case types.LOAD_USERS_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        users: payload
      }
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        successMessage: `User has been created`,
        users: [...state.users, payload]
      }
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        successMessage: `User has been updated`,
        users: updateUser(state.users, payload)
      }
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        successMessage: `User has been removed`,
        users: deleteUser(state.users, payload)
      }
    case types.CLEAR_MESSAGES:
      return {
        ...state,
        successMessage: '',
        errorMessage: ''
      }
    case types.LOGOUT:
      return {
        ...state,
        user: undefined
      }
    case types.RESET:
      return {
        ...initialState
      }
    default:
      return state
  }
}
