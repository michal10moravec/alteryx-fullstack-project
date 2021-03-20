import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { User } from '../backend/user/User'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { deleteUser } from 'redux/actions'
import { useDispatch } from 'react-redux'

interface ConfirmDeleteDialogProps {
  user: User
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  user
}) => {
  const fullName = `${user.firstName} ${user.lastName}`
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const openHandler = () => {
    setOpen(true)
  }

  const cancelHandler = () => {
    setOpen(false)
  }

  const deleteHandler = () => {
    dispatch(deleteUser(user.id))
    setOpen(false)
  }

  return (
    <div>
      <IconButton onClick={openHandler}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={cancelHandler}>
        <DialogTitle>Do you really want to delete user {fullName}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {fullName} will be deleted permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelHandler} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={deleteHandler}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
