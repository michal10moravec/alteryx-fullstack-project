import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import { User } from '../backend/user/User'
import { ViewEditDialog } from './ViewEditDialog'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'

interface UserTableProps {
  users: User[]
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <ViewEditDialog user={user} />
              </TableCell>
              <TableCell>
                {user.email}
              </TableCell>
              <TableCell align="right">
                <ConfirmDeleteDialog user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserTable
