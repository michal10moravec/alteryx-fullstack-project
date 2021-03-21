import { authMiddleware } from '../auth'
import { Express } from 'express'
import { getUser, getUsers } from './read'
import {
  validateCreateInputs,
  validateUpdateInputs,
  validateUserId
} from './validators'
import { createUser } from './create'
import { updateUser } from './update'
import { deleteUser } from './delete'

export const initUser = (server: Express) => {
  server.get('/users', authMiddleware, async (_req, res, next) => {
    try {
      res.json(await getUsers())
    } catch (err) {
      next(err)
    }
  })

  server.get('/user/:userId', authMiddleware, async (req, res, next) => {
    try {
      const validatedUserId = validateUserId(req.params)
      if (validatedUserId !== false) {
        res.json(await getUser(validatedUserId))
      } else {
        next(new Error('User id cannot be parsed'))
      }
    } catch (err) {
      next(err)
    }
  })

  server.put('/user', authMiddleware, async (req, res, next) => {
    try {
      const validatedUser = validateCreateInputs(req.body)
      if (validatedUser) {
        res.json(await createUser(validatedUser))
      } else {
        next(new Error('All user params have to be specified'))
      }
    } catch (err) {
      next(err)
    }
  })

  server.post('/user/:userId', authMiddleware, async (req, res, next) => {
    try {
      const validatedUser = validateUpdateInputs(req.params, req.body)
      if (validatedUser !== false) {
        res.json(await updateUser(validatedUser))
      } else {
        next(new Error('All user params have to be specified'))
      }
    } catch (err) {
      next(err)
    }
  })

  server.delete('/user/:userId', authMiddleware, async (req, res, next) => {
    try {
      const validatedUserId = validateUserId(req.params)
      if (validatedUserId !== false) {
        res.json(await deleteUser(validatedUserId))
      } else {
        next(new Error('User id cannot be parsed'))
      }
    } catch (err) {
      next(err)
    }
  })
}
