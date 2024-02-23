import React from 'react';
import './Subtotal.scss';
import { useStateValue } from '../context';
import { getBasketTotal } from '../reducer';

const Subtotal = () => {
  const [{ basket }] = useStateValue();

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
      <button type="button">Proceed to checkout</button>
    </div>
  );
};
export default Subtotal;
