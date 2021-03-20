import { AnyAction, Reducer } from 'redux'

interface User extends Form {
  id: number
}

export interface Form {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface GlobalState {
  form: Form
  users: User[]
}

export const initialState: GlobalState = {
  form: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },
  users: []
}

export const reducer: Reducer<GlobalState, AnyAction> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case 'CHANGE_FORM_INPUT':
      return {
        ...state,
        form: { ...state.form, [payload.fieldName]: payload.value }
      }
    case 'RESET':
      return {
        ...initialState
      }
    default:
      return state
  }
}
