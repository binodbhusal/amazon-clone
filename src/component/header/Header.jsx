import React from 'react';
import './Header.scss';
import { IoMdSearch } from 'react-icons/io';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context';
import { auth } from '../../firebase';

const Header = () => {
  const [{ basket, user }] = useStateValue();
  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img src="./amazon-logo.webp" alt="amazon-logo" className="amazon-logo" />
      </Link>
      <div className="search-bar">
        <input type="text" />
        <IoMdSearch className="search-icon" />
      </div>
      <div className="header-navbar">
        <Link to={!user && '/login'}>
          <button type="button" onClick={handleAuth} className="menu-options">
            <span className="text-menu-option-one">Hello User</span>
            <span className="text-menu-option-two">{user ? 'Signout' : 'Sign in'}</span>
          </button>
        </Link>
        <div className="menu-options">
          <span className="text-menu-option-one">Returns</span>
          <span className="text-menu-option-two">&Orders</span>
        </div>
        <div className="menu-options">
          <span className="text-menu-option-one">Your</span>
          <span className="text-menu-option-two">Prime</span>
        </div>
        <div className="shoping-cart">
          <Link to="/checkout">
            <PiShoppingCartSimple style={{ fontSize: '25px', cursor: 'pointer', color: '#fff' }} />
          </Link>
          <span className="text-menu-option-two cart-ount">{basket?.length}</span>
        </div>
      </div>
    </div>
  );
};
export default Header;
