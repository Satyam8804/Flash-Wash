import { app } from './app.js';
import connectDB from './DB/connectDB.js';

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("Server is Running at PORT -",process.env.PORT)
    })
})
.catch((err)=>{
    console.log("<MongoDb connection failed !!>",err)
})