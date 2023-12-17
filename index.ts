import express from 'express'
import dotenv from 'dotenv'
import { createRoutes } from './src/server/routes'

const app = express()
dotenv.config()

const host = process.env.HOST
const port = process.env.PORT

createRoutes()
  .then((routes) => {
    app.use(routes)
  })
  .catch((err) => {
    console.log(err)
  })

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' })
})

app.listen(port, () => {
  console.log(`Server ${host}:${port} is running`)
})
