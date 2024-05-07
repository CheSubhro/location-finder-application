
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import locationRouter from './routes/location.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/locations", locationRouter)
app.use("/api/v1/searchlocations", locationRouter)
app.use("/api/v1/getalllocations", locationRouter)


export { app }