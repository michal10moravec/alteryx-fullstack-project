import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { User } from '../backend/user/User'
import Link from '@material-ui/core/Link'
import { createEmptyUser } from '../backend/user/helpers'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import { updateUser } from '../redux/actions'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  content: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1)
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1)
    }
  }
}))

interface ViewEditDialogProps {
  user: User
}

export const ViewEditDialog: React.FC<ViewEditDialogProps> = ({ user }) => {
  const classes = useStyles()
  const fullName = `${user.firstName} ${user.lastName}`
  const [open, setOpen] = useState(false)
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

  useEffect(() => {
    setState({ ...user, password: '' })
  }, [user])

  const openHandler = () => {
    setOpen(true)
  }

  const cancelHandler = () => {
    setOpen(false)
  }

  const updateHandler = () => {
    dispatch(updateUser(state))
    setOpen(false)
  }

  return (
    <div>
      <Link href="#" onClick={openHandler}>
        {fullName}
      </Link>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={cancelHandler}>
        <DialogTitle>{fullName}</DialogTitle>
        <DialogContent className={classes.content}>
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
            helperText="You are not able to see the hashed password, however you can change it by setting a new one. If you leave the field empty, password stays unchanged."
            value={state.password}
            onChange={onChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelHandler} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={updateHandler}
            color="primary"
            endIcon={<EditIcon />}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
