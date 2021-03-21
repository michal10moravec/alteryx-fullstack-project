import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import { createEmptyUser } from '../backend/user/helpers'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1)
    }
  },
  bottomBox: {
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    '& .MuiAlert-root': {
      margin: theme.spacing(1)
    }
  }
}))

const SignUp: React.FC = () => {
  const classes = useStyles()
  const [state, setState] = useState(createEmptyUser())
  const [error, setError] = useState('')
  const router = useRouter()

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const validateInputs = () => {
    for (const value of Object.values(state)) {
      if (value.length === 0) {
        setError('Please fill in all requred fields')
        return false
      }
    }

    return true
  }

  const onSubmitHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault()

    if (validateInputs()) {
      try {
        const response = await fetch('/signup', {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(state)
        })

        if (response.ok && response.status === 200) {
          router.push('/signin')
        } else {
          const err = await response.text()
          setError(err)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onAlertCloseHandler: (
    event: React.SyntheticEvent<Element, Event>
  ) => void = () => {
    setError('')
  }

  return (
    <>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" align="center">
            Create your account
          </Typography>
          <form className={classes.form} autoComplete="off">
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
              onClick={onSubmitHandler}
            >
              Create an account
            </Button>
          </form>
        </Box>
      </Container>
      <Container maxWidth="sm">
        <Box className={classes.bottomBox} my={4}>
          {error && (
            <Alert
              onClose={onAlertCloseHandler}
              severity="error"
              variant="filled"
            >
              Error: {error}
            </Alert>
          )}
          <Typography align="center">
            Already have an account? <NextLink href="/signin">Sign in</NextLink>
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default SignUp
