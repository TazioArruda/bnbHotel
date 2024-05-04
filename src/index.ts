import 'dotenv/config'
import express from "express"

import { Database } from './database/connection'
import { routes } from './routes'
Database.initialize()

const port = process.env.PORT
const server = express()

server.use(express.json())
server.use(routes)



server.listen(port, () =>{
    console.log(" server " + port)
})