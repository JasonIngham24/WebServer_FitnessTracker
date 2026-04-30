import 'express-session'
import { User } from './index'

declare module 'express-session' {
  interface SessionData {
    user?: User
  }
}