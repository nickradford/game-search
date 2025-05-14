import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { logger } from 'hono/logger'

export const config = {
  runtime: 'edge'
}

const api = new Hono().basePath('/api')
api.use(logger())

api.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

api.get('/foo', c => {
  return c.json({ foo: "bar" })
})

export default handle(api)
