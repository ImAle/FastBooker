import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoute from './routes/authRoutes.js'
import hotelsRoute from './routes/hotelsRoutes.js'
import roomsRoute from './routes/roomsRoutes.js'
import usersRoute from './routes/usersRoutes.js'

dotenv.config()

const app = express()
const url = process.env.DATABASE
  

const connect = async ()=>{
    try{
        await mongoose.connect(url)
    }catch (error){
        throw error;
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected!")
})

mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected!")
})

// middlewares
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/users", usersRoute)
app.use("/api/rooms", roomsRoute)

app.listen (3000, ()=>{
    connect()
    console.log(`Server up on port ${3000}!`)
})
