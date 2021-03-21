import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../redux/reducers'
import { User } from '../backend/user/User'
import { useRouter } from 'next/router'
import { logout } from '../redux/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const MainMenu = () => {
  const classes = useStyles()
  const user = useSelector<GlobalState, User | undefined>((state) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()

  const logoutHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault()

    try {
      const response = await fetch('/logout', {
        credentials: 'same-origin'
      })
      if (response.ok && response.status === 200) {
        dispatch(logout())
        router.push('/signin')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const loginHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault()
    router.push('/signin')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {router.route === '/' ? 'Users' : ''}
        </Typography>
        {user && (
          <>
            <Typography className={classes.menuButton}>
              {user.firstName} {user.lastName}
            </Typography>
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          </>
        )}
        {!user && (
          <>
            <Typography className={classes.menuButton}>
              Not logged in
            </Typography>
            <Button color="inherit" onClick={loginHandler}>
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default MainMenu
