import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import express from 'express'

@Middleware({ type: 'before' })
export class JsonMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): any {
    const jsonMiddleware = express.json()
    jsonMiddleware(request, response, next)
  }
}
