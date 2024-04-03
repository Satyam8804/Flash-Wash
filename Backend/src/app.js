import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";

const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//seting up middlewares

app.use(cors(
    {   
        origin:process.env.CORS_ORIGIN,
        Credential:true
    }))
    
app.use(express.json({limit: '50mb' }))

app.use(express.urlencoded({extended:true,limit: '50mb'})) // related to geting data from url
app.use(express.static("public"))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("Hello World !!")
})


// routes import 

import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import employeeRouter from './routes/employee.route.js'

import { verifyJWT } from './middlewares/auth.middleware.js'
import isAdmin from './middlewares/admin.middleware.js'

// route declaration
app.use("/api/v1/users",userRouter)

app.use("/api/v1/admin",adminRouter)

app.use("/api/v1/employee",employeeRouter)

export {app}