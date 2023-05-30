import { spawn } from 'child_process'
import * as dotenv from 'dotenv'

dotenv.config()

const appProcess = spawn('node', ['app.js'])

appProcess.stdout.on('data', (data) => {
    console.log(`data: ${data}`)
})

appProcess.stderr.on('data', (data) => {
    console.log(`error: ${data}`)
})

appProcess.on('close', (code) => {
    console.log(`existed with code: ${code}`)
})