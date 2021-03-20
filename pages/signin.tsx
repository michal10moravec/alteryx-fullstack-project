import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { initializeStore } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Form, GlobalState } from '../redux/reducers'
import { changeFormInput } from '../redux/actions'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'

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

const SignIn: React.FC = () => {
  const classes = useStyles()

  const state = useSelector<GlobalState, Form>((state) => state.form)
  const dispatch = useDispatch()

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(changeFormInput(e.target.id, e.target.value))
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" align="center">
          Sign In
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
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
            Sign in
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export async function getStaticProps() {
  const reduxStore = initializeStore()

  return {
    props: {
      ...reduxStore.getState()
    }
  }
}

export default SignIn
