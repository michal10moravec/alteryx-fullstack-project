import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React, { useEffect } from 'react'
import { getUsers } from '../redux/actions'
import { getUsers as loadUsers } from '../backend/user/read'
import { initializeStore } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../redux/reducers'
import UserTable from '../frontend/UserTable'
import CreateUserForm from '../frontend/CreateUserForm'
import { AlertSnackbar } from '../frontend/AlertSnackbar'
import { GetServerSideProps } from 'next'
import { IncomingMessage } from 'http'
import { User } from '../backend/user/User'
import { Loading } from '../frontend/Loading'

interface IndexProps extends GlobalState {}

const Index: React.FC<IndexProps> = () => {
  const { users, status } = useSelector<GlobalState, GlobalState>(
    (state) => state
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'INIT') dispatch(getUsers())
  }, [])

  return (
    <>
      <Container maxWidth="md">
        <AlertSnackbar />
        <Box my={4}>
          <Typography variant="h4" component="h1" align="center">
            List of users
          </Typography>
          <CreateUserForm />
        </Box>
      </Container>

      <Container maxWidth="md">
        <Box my={4}>
          {status === 'LOADING' ? <Loading /> : <UserTable users={users} />}
        </Box>
      </Container>
    </>
  )
}

interface EnhancedReq extends IncomingMessage {
  user: User
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const reduxStore = initializeStore()

  const enhancedReq = (req as unknown) as EnhancedReq
  const users = await loadUsers()

  return {
    props: {
      initialReduxState: {
        ...reduxStore.getState(),
        status: 'SUCCESS',
        users,
        user: enhancedReq.user ? enhancedReq.user : null
      }
    }
  }
}

export default Index
