import Koa from 'koa'
import koaStatic from 'koa-static'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { createServer } from 'http'
import { Server } from 'socket.io'
import axios from 'axios'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 3000
const weatherApi = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = '7e92585c87ba4a3b94ade65dd377cffc'

const app = new Koa()
const httpServer = createServer(app.callback())
const io = new Server(httpServer, {})

const router = new Router()

app.use(koaStatic(__dirname))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

router.get('/weather/:city', (ctx, next) => {
  const city = ''
  const { data } = axios.get(`${weatherApi}?q=${city}&appid=${apiKey}`)
  console.log(data)
})

io.on('connection', (socket) => {
  console.log(`connection: ${socket}`)
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})