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
const weatherApi = process.env.WEATHER_API
const apiKey = process.env.WEATHER_API_KEY

const app = new Koa()
const httpServer = createServer(app.callback())
const io = new Server(httpServer, {})

const router = new Router()

app.use(koaStatic(__dirname))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

router.get('/weather/:city', async (ctx, next) => {
  const city = ''
  try {
    const { data } = await axios.get(weatherApi, {
      params: {
        q:city,
        appid: apiKey,
        lang: 'zh_cn',
        units: 'metric'
      }
    })
    ctx.body = data
  } catch(error) {
    console.error(`Failed to fetch weather data for ${city}: ${error}`)
  }
})

const updateWeather = async (socket, city) => {
  try {
    const { data } = await axios.get(weatherApi, {
      params: {
        q:city,
        appid: apiKey,
        lang: 'zh_cn',
        units: 'metric'
      }
    })
    socket.emit('weatherUpdated', data)
  } catch(error) {
    console.error(`Failed to fetch weather data for ${city}: ${error}`)
  }
}

io.on('connection', (socket) => {
  console.log(`connection: ${socket}`)
  socket.on('subscribe', async (city) => {
    console.log(`subscribe to ${city}`)
    await updateWeather(socket, city)
  })
  socket.on('disconnect', () => {
    console.log('Client disconnect')
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})