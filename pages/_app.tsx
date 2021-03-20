/**
 * Source: https://github.com/mui-org/material-ui/tree/master/examples/nextjs-with-typescript
 */

import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import MainMenu from '../frontend/MainMenu'
import { useStore } from '../redux/store'
import { Provider } from 'react-redux'

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props
  const store = useStore(pageProps.initialReduxState)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Alteryx Fullstack Project</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <MainMenu />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
