import React, { useState } from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { scheduleService } from '../utils/service';
import { Route, useNavigate, useRoutes } from 'react-router-dom';
import { toast } from 'react-hot-toast';
export const CheckoutForm = ({price}) => {
    const navigate=useNavigate()
    const [paytext,setPayText]=useState("Pay")
    //const route=useRoutes()
    //const { scheduleDate,address,notes,status,currentServiceId } = route.params
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState('');
  const email =JSON.parse(localStorage.getItem('currentUser')) ;

  const [emailInput, setEmailInput] = useState(email.user.email);

  const backendUrl = "https://j432axvrjy.us.aircode.run/payment";
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setPayText("Initialising payment, Please Wait...")

    if (elements == null || stripe == null) {
        setPayText("Pay")
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      setPayText("Pay")
      return;
    }

    const prices = parseInt(price);
  
    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'inr',
        email: emailInput,
        amount: prices,
        paymentMethodType: "card",
        description : "Car wash payment"
      }),
    });
    const { client_secret: clientSecret } = await res.json();
    // if(res){
    //     if(status.trim()==="true"){
    
    //         const res = await scheduleService(currentServiceId,scheduleDate,address,notes)
    //         if(res===true){
    //           toast.success("Appointment added successfully")
    //           navigate('/api/v1/users/profile/appointment')
    //         }else{
    //           toast.success("Appointment added successfully")
    //           navigate('/api/v1/users/profile/appointment')
    //         }
    //       }else{
    //         toast.error("Please Login to continue")
    //       }
    // }

    if(clientSecret){
        toast.success("Appointment added successfully")
    }


    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/api/v1/users/profile/appointment`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
       // alert("Payment ho gyi")
    }
  };

  return (
    <form onSubmit={handleSubmit} className='px-4'>
      <div className='mb-3'>
        <label htmlFor="email-input">Email</label>
        <div>
          <input style={{borderColor:'black',borderWidth:1,borderRadius:8}} disabled value={emailInput} onChange={(e => setEmailInput(e.target.value))} type="email" id="email-input" placeholder={{emailInput}} />
        </div>
 
        <p>Amount to Pay -: {price}</p>
      </div>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        {paytext}
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};