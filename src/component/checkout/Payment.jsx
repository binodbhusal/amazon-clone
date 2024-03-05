import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { collection, addDoc } from 'firebase/firestore';
import { CgShoppingBag } from 'react-icons/cg';
import { emptyBasket } from '../../Redux/cartSlice';
import { calculateSubtotal, EURO_FORMAT } from '../utils/constant';
import axios from '../../axios';
import { db } from '../../firebase';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const { basket } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.cart.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subtotal = calculateSubtotal(basket).toFixed(2);
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

      const orderRef = await addDoc(collection(db, 'users', user?.uid, 'orders'), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      // eslint-disable-next-line no-console
      console.log('Order added with ID: ', orderRef.id);

      setError(null);
      setSucceeded(true);
      setProcessing(false);
      dispatch(emptyBasket());
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
      const response = await axios.post(`/payments/create?total=${calculateSubtotal(basket) * 100}`);
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  return (
    <>
      <div className="flex justify-around items-center h-[80px] bg-gray-200">
        <div>
          <Link to="/">
            <img className="w-[100px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1206px-Amazon_logo.svg.png" alt="amazon-logo" />
          </Link>
        </div>
        <div>
          <h1 className="font-semibold text-xl">
            Checkout (
            <Link to="/cart" className="text-cyan-600">
              {basket?.length}
              {' '}
              items
            </Link>
            )
          </h1>
        </div>
        <div>
          <CgShoppingBag />

        </div>
      </div>

      <div className="grid grid-cols-11 gap-6 px-48 pt-4">
        <div className="col-span-8">
          <div className="payment-section flex p-2 mx-2  border-b border-gray-300 space-x-4">
            <div className="payment-title flex-1/5 font-semibold text-md ">
              Delivery Address
            </div>
            <div className="payment-title flex-4/5 text-sm">
              { user?.email }
              <p>117 RC/DT Rua Timor </p>
              <p>Olival Basto</p>
              <p>Portugal</p>
            </div>
          </div>
          <div className="payment-section flex p-2 mx-2  border-b border-gray-300 space-x-4">
            <div className="payment-title flex-1/5 font-semibold text-md ">
              Payment method
            </div>

            <div className="payment-details flex-4/5 w-4/5 ">
              <form onSubmit={handleSubmit}>
                <div className="border border-gray-400 p-2 rounded-md">
                  {' '}
                  <CardElement onChange={handleChange} />
                </div>
                <div className="flex justify-between">

                  <button className="bg-[#ffa41c] mt-3  p-1 px-8 rounded-lg" type="submit" disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : 'Buy now'}</span>
                  </button>
                  <div>
                    <img className="h-8 w-full" src="https://www.internationalscienceediting.com/wp-content/uploads/2017/06/logo-stripe.png" alt="payment-method" />
                  </div>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
          <div className="payment-section flex p-2 mx-2  border-b border-gray-300 space-x-4">
            <div className="payment-title flex-1/5 font-semibold text-md ">
              Items and shipping
            </div>
            <div className="payment-title flex-4/5 w-full">
              {basket.map((item) => (
                <div key={item.id} className="flex space-x-1 items center">
                  <img src={item.image} alt="item" className="h-5 w-5 rounded-md" />
                  <div className="w-full">
                    <p className="line-clamp-1 font-medium">{item.title}</p>
                    <p className="line-clamp-1 font-semibold">{EURO_FORMAT.format(item.price)}</p>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3 border bg-gray-200 border-gray-300 rounded-md  h-[40vh] flex-shrink-0">
          <div className="px-4 bg-amazonclone-background pt-4 pb-6 rounded-t-md">
            <h1 className="font-bold text-xl">Order Summary</h1>

            <div>
              <div className="flex justify-between pt-2 text-sm">
                <div>
                  Subtotal(
                  {basket?.length}
                  {' '}
                  items: )
                </div>
                <div className="">--</div>
              </div>
              <div className="flex justify-between pt-1 text-sm">
                <div className="">
                  Shipping & handling:
                </div>
                <div className="">--</div>
              </div>
              <div className="flex justify-between pt-1 text-sm">
                <div className="">
                  Total before tax:
                </div>
                <div className="">--</div>
              </div>
              <div className="border border-gray-300 w-[60px] ml-auto mt-2" />
              <div className="flex justify-between pt-1 text-sm">
                <div className="">
                  Estimated tax to be collected:
                </div>
                <div className="">--</div>
              </div>
              <div className="border border-gray-300 mt-2" />
              <div className="flex justify-between pt-1 mt-2 text-xl font-bold text-rose-700">
                <div>
                  Order total:
                </div>
                <div>{EURO_FORMAT.format(subtotal)}</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>

  );
};
export default Payment;
