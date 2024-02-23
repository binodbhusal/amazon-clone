import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Checkout from './component/checkout/Checkout';
import Login from './component/auth/Login';
import { auth } from './firebase';
import { useStateValue } from './component/context';

function App() {
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
