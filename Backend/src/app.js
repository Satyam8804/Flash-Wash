import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

//seting up middlewares

app.use(cors(
    {   
        origin:process.env.CORS_ORIGIN,
        Credential:true
    }))
    
app.use(express.json({limit: '16kb'   }))
app.use(express.urlencoded({extended:true,limit: '16kb'})) // related to geting data from url
app.use(express.static("public"))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("Hello World !!")
})


// routes import 

import userRouter from './routes/user.routes.js'
import { verifyJWT } from './middlewares/auth.middleware.js'

// route declaration
app.use("/api/v1/users",userRouter)

export {app}