import { Express } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { getUser, getUserByEmailAndPassword } from './user/read'
import { User } from './user/User'

export const initPassport = (server: Express) => {
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
      .catch((err) => {
        done('Deserialization error', err)
      })
  })

  server.post('/login', passport.authenticate('local'), (_req, res) => {
    res.sendStatus(200)
  })

  server.get('/logout', (req, res) => {
    req.logout()
    res.sendStatus(200)
  })
}
