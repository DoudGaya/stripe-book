// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

// const priceId = 'price_1HVHU6B0J6z4k6q3U7e5UJZu';

// // replace with your actual price ID from your Stripe account

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (error) {
//       console.log('Error:', error);
//       setError(error.message);
//     } else {
//       console.log('Success:', paymentMethod);
//       setSuccess(true);
//       const { id } = paymentMethod;

//       try {
//         const response = await fetch('/buy', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ id, priceId }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok.');
//         }

//         console.log('Purchase complete!');
//       } catch (error) {
//         console.log('Error:', error.message);
//         setError(error.message);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>Purchase complete!</p>}
//       <button type="submit" disabled={!stripe}>
//         Buy eBook for $20
//       </button>
//     </form>
//   );
// };

// export default function App() {
//   const stripePromise = loadStripe(
//     'pk_test_TYooMQauvdEDq54NiTphI7jx' 
//     // replace with your actual publishable key from your Stripe account
//   );

//   return (
//     <StripeProvider stripe={stripePromise}>
//       <Elements>
//         <CheckoutForm />
//       </Elements>
//     </StripeProvider>
//   );
// }
