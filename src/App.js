import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Checkout from './component/checkout/Checkout';
import Payment from './component/checkout/Payment';
import Login from './component/auth/Login';
import { auth } from './firebase';
import { useStateValue } from './component/context';
import Orders from './component/checkout/Orders';

function App() {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const [, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('The user is >>>>', authUser);
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={(
              <>
                <Header />
                <Routes>

                  <Route path="/" element={<Home />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />

                  <Route
                    path="/payment"
                    element={(
                      <Elements stripe={stripePromise}>
                        <Payment />
                      </Elements>
                   )}

                  />
                </Routes>
              </>
        )}
          />
        </Routes>

      </div>
    </BrowserRouter>
  );
}
export default App;
