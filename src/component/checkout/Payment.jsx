import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { collection, addDoc } from 'firebase/firestore';
import { useStateValue } from '../context';
import CheckoutProduct from './CheckoutProduct';
import './Payment.scss';
import { getBasketTotal } from '../reducer';
import axios from '../../axios';
import { db } from '../../firebase';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState('');
  const [clientSecret, setClientSecret] = useState(true);
  const [{ basket, user, id }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      // Use collection and addDoc to add a document to the 'orders' collection
      const orderRef = await addDoc(collection(db, 'users', user?.uid, 'orders'), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      console.log('Order added with ID: ', orderRef.id);

      setError(null);
      setSucceeded(true);
      setProcessing(false);
      dispatch({
        type: 'EMPTY_BASKET',
      });
      navigate('/orders', { replace: true });
    } catch (error) {
      setError(`Payment failed: ${error.message}`);
      setSucceeded(false);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post(`/payments/create?total=${getBasketTotal(basket) * 100}`);
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (
          <Link to="/checkout">
            {basket?.length}
            {' '}
            Items
          </Link>
          )
        </h1>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p> Rue TimBastoor 117</p>
            <p> Olival </p>
            <p>Lisbon</p>
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review Item and Delivery</h3>

          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                key={id}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>

          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="price-container">
                <strong>
                  Order total: €
                  {getBasketTotal(basket)}

                </strong>
                <button type="submit" disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy now'}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>

          </div>

        </div>
      </div>
    </div>
  );
};
export default Payment;
