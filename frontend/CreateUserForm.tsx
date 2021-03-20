import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../redux/actions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { createEmptyUser } from '../backend/user/helpers'

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1)
    }
  }
}))

interface CreateUserFormProps {}

const CreateUserForm: React.FC<CreateUserFormProps> = () => {
  const classes = useStyles()
  const [state, setState] = useState(createEmptyUser())

  const dispatch = useDispatch()

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const onClickHandler = () => {
    dispatch(createUser(state))
  }

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField
        required
        id="firstName"
        label="First name"
        variant="outlined"
        value={state.firstName}
        onChange={onChangeHandler}
      />
      <TextField
        required
        id="lastName"
        label="Last name"
        variant="outlined"
        value={state.lastName}
        onChange={onChangeHandler}
      />
      <TextField
        required
        id="email"
        label="Email address"
        variant="outlined"
        value={state.email}
        onChange={onChangeHandler}
      />
      <TextField
        required
        id="password"
        type="password"
        label="Password"
        variant="outlined"
        value={state.password}
        onChange={onChangeHandler}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        endIcon={<AddIcon />}
        onClick={onClickHandler}
      >
        Create user
      </Button>
    </form>
  )
}

export default CreateUserForm
