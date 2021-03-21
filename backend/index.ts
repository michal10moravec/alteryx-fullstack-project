import express, { NextFunction, Request, Response } from 'express'
import next from 'next'
import bodyParser from 'body-parser'
import session from 'express-session'
import { createUser } from './user/create'
import { getUser, getUsers } from './user/read'
import { User } from './user/User'
import { updateUser } from './user/update'
import { deleteUser } from './user/delete'
import { initPassport } from './passport'

const port = parseInt(process.env.PORT ?? '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const passportSession = req.session as any
  if (passportSession.passport && passportSession.passport.user) {
    next()
  } else {
    res.redirect('/signin')
  }
}

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
  initPassport(server)

  server.get('/users', authMiddleware, async (_req, res, next) => {
    try {
      res.json(await getUsers())
    } catch (err) {
      next(err)
    }
  })

  server.get('/user/:userId', authMiddleware, async (req, res, next) => {
    try {
      const userId = parseInt(req.params.userId)
      if (isNaN(userId)) return next(new Error('User id cannot be parsed'))

      res.json(await getUser(userId))
    } catch (err) {
      next(err)
    }
  })

  server.put('/user', authMiddleware, async (req, res, next) => {
    try {
      const payload: Partial<Omit<User, 'id'>> = req.body
      if (
        payload.firstName &&
        payload.lastName &&
        payload.email &&
        payload.password
      ) {
        res.json(await createUser(payload as Omit<User, 'id'>))
      } else {
        next(new Error('All user params have to be specified'))
      }
    } catch (err) {
      next(err)
    }
  })

  server.post('/user/:userId', authMiddleware, async (req, res, next) => {
    try {
      const userId = parseInt(req.params.userId)
      if (isNaN(userId)) return next(new Error('User id cannot be parsed'))

      const payload: Partial<Omit<User, 'id'>> = req.body
      if (payload.firstName && payload.lastName && payload.email) {
        res.json(await updateUser(userId, payload))
      } else {
        next(new Error('All user params have to be specified'))
      }
    } catch (err) {
      next(err)
    }
  })

  server.delete('/user/:userId', authMiddleware, async (req, res, next) => {
    try {
      const userId = parseInt(req.params.userId)
      if (isNaN(userId)) return next(new Error('User id cannot be parsed'))

      res.json(await deleteUser(userId))
    } catch (err) {
      next(err)
    }
  })

  server.get('/', authMiddleware, (req, res) => {
    return app.render(req, res, '/')
  })

  server.post('/signup', async (req, res, next) => {
    try {
      const payload: Partial<Omit<User, 'id'>> = req.body
      if (
        payload.firstName &&
        payload.lastName &&
        payload.email &&
        payload.password
      ) {
        res.json(await createUser(payload as Omit<User, 'id'>))
      } else {
        next(new Error('All user params have to be specified'))
      }
    } catch (err) {
      next(err)
    }
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
