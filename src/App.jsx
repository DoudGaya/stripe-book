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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setSuccess(false);
    } else {
      setError(null);
      const paymentIntent = await stripe.confirmCardPayment(paymentMethod.id, {
        amount: 2000, // 2000 represents $20 in cents
        currency: 'usd',
      });

      if (paymentIntent.error) {
        setError(paymentIntent.error.message);
        setSuccess(false);
      } else {
        setSuccess(true);
        // send email to buyer
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Buy ebook for $20</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Payment successful!</p>}
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeWrapper;
