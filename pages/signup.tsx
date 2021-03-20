import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
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

const SignUp: React.FC = () => {
  const classes = useStyles()
  const [state, setState] = useState(createEmptyUser())

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" align="center">
          Create your account
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            required
            fullWidth
            id="firstName"
            label="First name"
            variant="outlined"
            value={state.firstName}
            onChange={onChangeHandler}
          />
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last name"
            variant="outlined"
            value={state.lastName}
            onChange={onChangeHandler}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email address"
            variant="outlined"
            value={state.email}
            onChange={onChangeHandler}
          />
          <TextField
            required
            fullWidth
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
            endIcon={<SendIcon />}
          >
            Create an account
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default SignUp
