import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, GlobalState } from '../redux/reducers'
import { changeFormInput, createUser } from '../redux/actions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'

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

  const state = useSelector<GlobalState, Form>((state) => state.form)
  const dispatch = useDispatch()

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(changeFormInput(e.target.id, e.target.value))
  }

  const onClickHandler = () => {
    dispatch(createUser())
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
