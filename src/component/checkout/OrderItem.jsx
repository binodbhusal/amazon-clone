// OrderItem.jsx

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'; // Make sure to import the moment library
import CheckoutProduct from './CheckoutProduct';
import './OrderItem.scss';

const OrderItem = ({ order }) => (
  <div className="order-container">
    <h2>Order</h2>
    <p>{moment.unix(order.created).format('MMMM Do YYYY, h:mma')}</p>
    <p className="order-id">
      <small>{order.id}</small>
    </p>
    {order.basket?.map((item) => (
      // Assuming CheckoutProduct is correctly implemented
      <CheckoutProduct
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        rating={item.rating}
        image={item.image}
      />
    ))}
  </div>
);

OrderItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    basket: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        // Add more properties as needed
      }),
    ),
  }).isRequired,
};

export default OrderItem;
