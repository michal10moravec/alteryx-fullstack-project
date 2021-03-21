import { createUser } from '../user/create'
import { Express, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { getUser, getUserByEmailAndPassword } from '../user/read'
import { User } from '../user/User'

export const initAuth = (server: Express) => {
  server.use(passport.initialize())
  server.use(passport.session())
  passport.use(
    new Strategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await getUserByEmailAndPassword(email, password)
          return done(null, user)
        } catch (err) {
          return done(null, false)
        }
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, (user as User).id)
  })
  passport.deserializeUser((id, done) => {
    getUser(id as number)
      .then((user) => {
        done(null, user)
      })
      .catch(() => {
        done(new Error('Deserialization error'))
      })
  })

  server.post('/login', passport.authenticate('local'), (_req, res) => {
    res.sendStatus(200)
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

  server.get('/logout', (req, res) => {
    req.logout()
    res.sendStatus(200)
  })
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const passportSession = req.session as any
  if (passportSession.passport && passportSession.passport.user) {
    next()
  } else {
    res.redirect('/signin')
  }
}
