import express, { NextFunction, Request, Response } from 'express'
import next from 'next'
import bodyParser from 'body-parser'
import { createUser } from './user/create'
import { getUser, getUsers } from './user/read'
import { User } from './user/User'

const port = parseInt(process.env.PORT ?? '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())

  server.get('/users', async (_req, res, next) => {
    try {
      res.json(await getUsers())
    } catch (err) {
      next(err)
    }
  })

  server.get('/user/:userId', async (req, res, next) => {
    try {
      const userId = parseInt(req.params.userId)
      if (isNaN(userId)) return next(new Error('User id cannot be parsed'))

      res.json(await getUser(userId))
    } catch (err) {
      next(err)
    }
  })

  server.put('/user', async (req, res, next) => {
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

  server.use(
    (err: Error, _req: Request, res: Response, _next: NextFunction) => {
      res.status(500).send(err.message)
    }
  )

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
