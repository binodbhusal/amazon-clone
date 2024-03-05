import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Payment from './component/checkout/Payment';
import Login from './component/auth/Login';
import Cart from './component/checkout/Cart';
import { setUser } from './Redux/cartSlice';
import { auth } from './firebase';

import Orders from './component/checkout/Orders';
import ProductPage from './component/product/ProductPage';
import SearchResults from './component/header/SearchResults';
import CategoryProducts from './component/product/CategoryProducts';
import Success from './component/checkout/Success';

function App() {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser({ user: authUser }));
      } else {
        dispatch(setUser({ user: null }));
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="app min-w[100px] max-w[1500px]">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />

          <Route
            path="/*"
            element={(
              <>
                <Header />
                <Routes>

                  <Route path="/" element={<Home />} />
                  <Route path="/category/:categoryId" element={<CategoryProducts />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<Cart />} />

                  <Route path="/orders" element={<Orders />} />
                  <Route path="/search" element={<SearchResults />} />

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
