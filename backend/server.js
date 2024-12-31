import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectToMongoDB from './db/db.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(5050, ()=>{
    connectToMongoDB()
    console.log("Server is running on port 5050")
})