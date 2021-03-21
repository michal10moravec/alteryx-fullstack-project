import express, { NextFunction, Request, Response } from 'express'
import next from 'next'
import bodyParser from 'body-parser'
import session from 'express-session'
import { authMiddleware, initAuth } from './auth'
import { initUser } from './user'

const port = parseInt(process.env.PORT ?? '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(
    session({
      secret: 'alteryx-fullstack-project',
      resave: false,
      saveUninitialized: false
    })
  )
  initAuth(server)
  initUser(server)
  server.get('/', authMiddleware, (req, res) => {
    return app.render(req, res, '/')
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    if (err.message === 'Deserialization error') {
      //this happens when user deletes his own user record
      //therefore user profile cannot be retrieved from db
      //at this point we have to logout the user and redirect him
      req.logout()
      res.redirect('/signin')
      return
    }
    res.status(500).send(err.message)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
