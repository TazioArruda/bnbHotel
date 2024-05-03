import 'dotenv/config'
import express from "express"

import { Database } from './database/connection'
Database.initialize()

const port = process.env.PORT
const server = express()
server.listen(port, () =>{
    console.log(" server " + port)
})