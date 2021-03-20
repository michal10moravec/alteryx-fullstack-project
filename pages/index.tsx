import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React, { useEffect } from 'react'
import { getUsers } from '../redux/actions'
import { initializeStore } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../redux/reducers'
import UserTable from '../frontend/UserTable'
import CreateUserForm from '../frontend/CreateUserForm'

const Index = () => {
  const { users, status, error } = useSelector<GlobalState, GlobalState>(
    (state) => state
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'INIT') dispatch(getUsers())
  }, [])

  return (
    <>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" align="center">
            List of users
          </Typography>
          <CreateUserForm />
          {status === 'LOADING' && (
            <Typography variant="h4" component="h1" align="center">
              Loading data
            </Typography>
          )}
        </Box>
      </Container>

      <Container maxWidth="md">
        <Box my={4}>
          <UserTable users={users} />
          {error}
        </Box>
      </Container>
    </>
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

export default Index
