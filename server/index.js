//PATHS
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
//utils
import connectDB from './config/db.js'
//routes
import userRoutes from './routes/userRoutes.js'
import stepRoutes from './routes/stepRoutes.js'
import activityRoutes from './routes/activityRoutes.js'
import leaderBoardRoutes from './routes/leaderBoardRoutes.js'

dotenv.config()
const port= process.env.PORT || 5000

connectDB()

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/steps',stepRoutes)
app.use('/api/activities',activityRoutes)
app.use('/api/leaderboard',leaderBoardRoutes)

app.listen(port , ()=>{
    console.log(`successfully running on ${port}`)
})
export default function handler(req, res) {
    app(req, res);
  }
