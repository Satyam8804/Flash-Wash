import Razorpay from 'razorpay';
require("dotenv").config();
const express = require("express");
const router = express.Router();

const razorpay = new Razorpay({
key_id: 'rzp_test_GIWGpe2jfY3TRh',
   key_secret: 'P8Lgyxk0GYIrOAY3oGBPlJW3'
})

router.post('/order', async (req, res) => {
    // initializing razorpay
    const razorpay = new Razorpay({
        key_id: req.body.keyId,
        key_secret: req.body.keySecret,
    });

    // setting up options for razorpay order.
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "any unique id for every order",
        payment_capture: 1
    };
    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
       res.status(400).send('Not able to create order. Please try again!');
    }
});



// require("dotenv").config();
// const express = require("express");
// const Razorpay = require("razorpay");

// const router = express.Router();

// router.post("/orders", async (req, res) => {
//     try {
//         const instance = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_SECRET,
//         });

//         const options = {
//             amount: 50000, // amount in smallest currency unit
//             currency: "INR",
//             receipt: "receipt_order_74394",
//         };

//         const order = await instance.orders.create(options);

//         if (!order) return res.status(500).send("Some error occured");

//         res.json(order);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });