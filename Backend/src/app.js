import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Razorpay from 'razorpay';
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


import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import employeeRouter from './routes/employee.route.js'

import { verifyJWT } from './middlewares/auth.middleware.js'
import isAdmin from './middlewares/admin.middleware.js'
import { ApiError } from './Utils/ApiError.js';

// route declaration
app.use("/api/v1/users",userRouter)

app.use("/api/v1/admin",adminRouter)

app.use("/api/v1/employee",employeeRouter)

const razorpay = new Razorpay({
    key_id: 'rzp_test_GIWGpe2jfY3TRh',
       key_secret: 'P8Lgyxk0GYIrOAY3oGBPlJW3'
    })

    app.post('/api/razorpay/order', (req, res) => {
        const options = {
          amount: req.body.amount, // Amount in smallest currency unit (e.g., paise for INR)
          currency: req.body.currency,
          receipt: 'receipt#1',
          payment_capture: 1,
        };
        razorpay.orders.create(options, (err, order) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Something went wrong' });
          }
          res.json(order);
        });
      });
      
      app.post('/api/razorpay/success', (req, res) => {
        // Handle payment success here, you can save payment details to your database
        const payment_id = req.body.payment_id;
        const order_id = req.body.order_id;
        console.log('Payment ID:', payment_id);
        console.log('Order ID:', order_id);
        res.json({ success: true });
      });


export {app}