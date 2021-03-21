import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../redux/reducers'
import { clearMessages } from '../redux/actions'

const useStyles = makeStyles((theme: Theme) => ({
  red: {
    '& .MuiSnackbarContent-root': {
      backgroundColor: theme.palette.error.main
    }
  },
  green: {
    '& .MuiSnackbarContent-root': {
      backgroundColor: 'green'
    }
  }
}))

export const AlertSnackbar: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { status, successMessage, errorMessage } = useSelector<
    GlobalState,
    GlobalState
  >((state) => state)

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(clearMessages())
  }

  return (
    <div>
      <Snackbar
        className={status === 'SUCCESS' ? classes.green : classes.red}
        open={successMessage !== '' || errorMessage !== ''}
        message={status === 'SUCCESS' ? successMessage : errorMessage}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      ></Snackbar>
    </div>
  )
}
