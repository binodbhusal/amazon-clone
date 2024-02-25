import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Subtotal.scss';
import { useStateValue } from '../context';
import { getBasketTotal } from '../reducer';

const Subtotal = () => {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();
  const handleProceedToCheckout = () => {
    navigate('/payment');
  };
  return (
    <div className="subtotal">
      <>
        <p>
          Subtotal(
          {basket.length}
          {' '}
          Items):
          {' '}
          <strong>
            {getBasketTotal(basket)}
            €
          </strong>
        </p>
        <small className="subtotal-gift">
          <input type="checkbox" />
          {' '}
          This order contains a gift
        </small>
      </>
      <button type="button" onClick={handleProceedToCheckout}>Proceed to checkout</button>
    </div>
  );
};
export default Subtotal;
