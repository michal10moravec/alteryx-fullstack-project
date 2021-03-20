import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { initializeStore } from '../redux/store'

const Index = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js with TypeScript example
        </Typography>
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

export default Index
