import express from "express"
import mongoose from "mongoose"
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'

const app = express()
const url = "mongodb://172.17.0.2:27017/test"
  

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
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/users", usersRoute)
app.use("/api/rooms", roomsRoute)

app.listen (3000, ()=>{
    connect()
    console.log(`Server on port ${3000}!`)
})
