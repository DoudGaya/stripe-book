import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);



  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51HzjJ0IZVnUHMwaTcHPvc9CEnavGX0VPRv9FzVHGAMzNbtHtjVosD2NmFOEdbmc45jge7nNMSqzeRI95w8xB4yGJ004iSlo1GI',
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });


  
    if (error) {
      setError(error.message);
      setSuccess(false);
      console.log(paymentError)
    } else {
      console.log(paymentMethod)
      const paymentIntent = await stripe.confirmCardPayment(options.clientSecret, {
        amount: 2000, // 2000 represents $20 in cents
        currency: 'usd',
      });


      console.log(paymentIntent)

      if (paymentIntent.error) {
        setError(paymentIntent.error.message);
        setSuccess(false);
      } else {
        setSuccess(true);
        // send email to buyer
        console.log('Payment successfull')
      }
    }
  };

  return (
   <div className=" w-full bg-green-400 flex flex-col items-center space-y-8">
      <form onSubmit={handleSubmit} className=" w-6/12 px-6 bg-yellow-300">
        <h1>Buy ebook for $20</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Payment successful!</p>}
        <CardElement className=' px-3 text-sm my-6 py-3 border-2 rounded-md' />
       <div className=" w-full bg-red-400 flex justify-center">
       <button type="submit" disabled={!stripe} className="bg-black px-8 py-2 text-white rounded-lg my-6 mx-auto ">
          Buy Now
        </button>
       </div>
      </form>
   </div>
  );
};

const stripePromise = loadStripe('pk_test_51HzjJ0IZVnUHMwaTXSLLQYdezooQmDRjGPBREBa1y4tOVGQlT2xdQkxsaYvEyPbcZfxZV3NgEVkdpNXFO2G7uOkg00ByDU4swk');

const StripeWrapper = () => {

  return (
    <Elements stripe={stripePromise} >
      <CheckoutForm />
    </Elements>
  );
};

export default StripeWrapper;
