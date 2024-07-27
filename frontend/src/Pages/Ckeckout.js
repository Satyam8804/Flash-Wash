import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, Outlet, useNavigate,useLocation } from "react-router-dom";
import toast from 'react-hot-toast';


const Checkout = (props) => {
  const location = useLocation();
  const { price } = location.state;
  const email =JSON.parse(localStorage.getItem('currentUser')) ;
  const userEmail=email.user.email;
  const navigate=useNavigate()
  const [paymentDetails, setPaymentDetails] = useState({
    amount: parseInt(price)*100, // Amount in smallest currency unit (e.g., paise for INR)
    currency: 'INR',
    name: 'Flash Car Wash',
    description: 'Payment for car washing service',
  });
  
  const openRazorpayModal = async () => {
    try {
      const response = await axios.post('https://flash-wash-l6v3.onrender.com/api/razorpay/order', paymentDetails);
      const { data } = response;
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: data.name,
        description: data.description,
        order_id: data.id,
        handler: function (response) {
          console.log(response);
          // Handle the payment success here, for example, send the payment details to your backend
          const paymentData = {
            payment_id: response.razorpay_payment_id,
            order_id: data.id,
          };
          
          toast.success("Appointment added Successfully")
          navigate('/api/v1/users/profile/appointment')
        },
      };
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    openRazorpayModal()
  },[])
  return (
    <div>
      <h1>Product Purchase</h1>
      <p>Total Amount: {paymentDetails.amount/100 } {paymentDetails.currency}</p>
      <button onClick={openRazorpayModal}>Pay Now</button>
    </div>
  )
}

export default Checkout