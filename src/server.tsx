// import http from 'http'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import fastifyStatic from '@fastify/static'
import { join, dirname } from 'path'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import App from './App'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const port = 5000

import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

fastify.get('/', async (_, res) => {

  const app = renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )

  const initialHtml = readFileSync(join(__dirname, 'index.html'), 'utf8')

  const html = initialHtml.replace('<div id="root"></div>', `<div id="root">${app}</div>`)

  res.headers({ 'Content-Type': 'text/html' })

  res.send(html)
})

fastify.register(fastifyStatic, {
  root: join(__dirname, 'assets'),
  prefix: '/assets/',
})

const start = async () => {
  try {
    await fastify.listen({ port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()