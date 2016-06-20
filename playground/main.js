import express from 'express'
import { createServer } from 'http'
import logger from 'morgan'
import { json as formBodyParser } from 'body-parser'
import PouchDB from 'pouchdb'
import pouchDBMiddleware from 'express-pouchdb'

import 'colors'

const app = express()
const server = createServer(app)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/db', pouchDBMiddleware(PouchDB.defaults({ prefix: 'pouchdb-files/' })))

app.use(formBodyParser())
app.use(logger('dev'))

server.listen(process.env.PORT || 3001, () => {
  console.log('Playground server running on port'.green, String(server.address().port).cyan)
})

app.post('/sessions', (req, res) => {
  setTimeout(() => {
    const [prefix] = req.body.email.split('@')
    if (prefix.toLowerCase() === String(req.body.password).toLowerCase()) {
      res.status(201).json({ status: 'authenticated' })
    } else {
      res.status(401).json({ status: 'authentication failed' })
    }
  }, 500)
})
