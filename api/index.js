import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoute from './routes/authRoutes.js'
import hotelsRoute from './routes/hotelsRoutes.js'
import roomsRoute from './routes/roomsRoutes.js'
import usersRoute from './routes/usersRoutes.js'

dotenv.config()

/**
 * Express server.
 */
const app = express()

/**
 * URL database.
 * @type {String}
 */
const url = process.env.DATABASE
  
/**
 * Function to connect to the database
 * @function
 * @async
 * @throws {Error} - Connection to DB failed
 */
const connect = async ()=>{
    try{
        await mongoose.connect(url)
    }catch (e){
        throw e;
    }
}

/**
 * Logs to console in case the database is disconnected 
 * @listens
 */
mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected!")
})

/**
 * Logs to console in case the database is connected 
 * @listens
 */
mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected!")
})

// middlewares

/**
 * Makes from a cooky a javascript object
 */
app.use(cookieParser())

/**
 * interprets all information received in json format
 */
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/users", usersRoute)
app.use("/api/rooms", roomsRoute)

/**
 * Function to server up in the indicated port
 * @function
 * @listens
 */
app.listen (3000, ()=>{
    connect()
    console.log(`Server up on port ${3000}!`)
})
