import { User } from '../backend/user/User'
import { AnyAction, Reducer } from 'redux'
import * as types from './types'

export interface Form {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface GlobalState {
  form: Form
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR'
  error: string
  users: User[]
}

export const initialState: GlobalState = {
  form: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },
  status: 'INIT',
  error: '',
  users: []
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
        error: payload
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
        users: [...state.users, payload]
      }
    case types.CHANGE_FORM_INPUT:
      return {
        ...state,
        form: { ...state.form, [payload.fieldName]: payload.value }
      }
    case types.RESET:
      return {
        ...initialState
      }
    default:
      return state
  }
}
