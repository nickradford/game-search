import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge'
}

const api = new Hono().basePath('/api')

api.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

api.get('/foo', c => {
  return c.json({ foo: "bar" })
})

export default handle(api)
