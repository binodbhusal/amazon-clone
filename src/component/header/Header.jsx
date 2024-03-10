import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PiShoppingCartSimple } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { LuMenu } from 'react-icons/lu';
import { GrLocation } from 'react-icons/gr';

import { auth } from '../../firebase';
import Search from './Search';
import { setUser } from '../../Redux/cartSlice';

const Header = () => {
  const { productNumber } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.cart.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAuth = () => {
    if (user) {
      auth
        .signOut()
        .then(() => {
          dispatch(setUser({ user: null }));
          navigate('/login');
        });
    }
  };
  return (
    <div className="min-w[1000px]">
      <div className="flex bg-amazonclone text-white h-[60px]">
        {/* left section */}
        <div className="flex items-center">
          <Link to="/">
            <div className="border border-transparent rounded m-1 py-2 px-2 mr-4  hover:border-white">
              <img
                className="h-[35px] w-[100px]"
                src="../amazon-logo.webp"
                alt="amazon-logo"
              />
            </div>
          </Link>
          <div className="border border-transparent rounded py-1 px-2 pl-6 hover:border-white">
            <div className="text-xs lg:text-sm"><span className="text-gray-300 text-xs font-semibold font-Amazon-Ember-Regular">Deliver to</span></div>
            <div className=" flex text-sm lg:text-base mt-[-5px]">
              <GrLocation className=" ml-[-20px] text-[20px]" />
              <span className="font-bold">Portugal</span>
            </div>
          </div>
        </div>
        {/* center section */}
        <div className="flex-grow flex items-center mx-3">
          <Search />
        </div>
        {/* right section  */}
        <div className="flex items-center">
          <div className="border border-transparent rounded py-1 px-2  hover:border-white">
            <div className="text-xs lg:text-sm">
              <Link to={!user && '/login'}>
                <button type="button" onClick={handleAuth} className="menu-options">
                  <span className="text-menu-option-one overflow-hidden whitespace-nowrap">
                    Hello,
                    {' '}
                    {!user ? 'Guest' : user.displayName}
                  </span>
                  <div className="text-sm lg:text-base mt[-2] font-semibold">{user ? 'Signout' : 'Sign in'}</div>
                </button>
              </Link>
            </div>

          </div>
          <div className="border border-transparent rounded py-1 px-2  hover:border-white">
            <Link to={user ? '/orders' : '/login'}>
              <div className="text-xs lg:text-sm">Returns</div>
              <div className="text-sm lg:text-base mt[-2] font-semibold">& Orders</div>
            </Link>
          </div>
          <div className="pr-3 pl-2 flex border border-transparent rounded py-1 hover:border-white">
            <Link to="/cart">
              <PiShoppingCartSimple style={{ fontSize: '45px', color: '#fff' }} />
              <div className="relative text-white"><span className="absolute text-orange-400 font-bold mt-[-35px] right-[15px]">{productNumber}</span></div>
            </Link>
            <div className="text-sm lg:text-base mt-5 font-semibold">Cart</div>
          </div>
        </div>
      </div>
      <div className="flex items-center text-xs font-semibold lg:text-sm space-x-4 bg-amazonclone-light_blue p-2 text-white">
        <div className="flex text-base">

          <LuMenu style={{ fontSize: '25px' }} />
          <span>
            All
          </span>

        </div>

        <div>Today&apos;s Deals</div>
        <div>Customer Service</div>
        <div>Registry</div>
        <div>Gift Cards</div>
        <div>Sell</div>
      </div>
    </div>

  );
};
export default Header;
