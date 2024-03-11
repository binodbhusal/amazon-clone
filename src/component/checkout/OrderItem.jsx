// OrderItem.jsx

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './OrderItem.scss';
import { EURO_FORMAT } from '../utils/constant';

const OrderItem = ({ order }) => (
  <div className="px-12 bg-gray-200  mb-3 rounded-md shadow relative py-2">
    <p className="font-bold">{moment.unix(order.created).format('MMMM Do YYYY, h:mma')}</p>
    <p className="absolute top-[10px] right-[20px]">
      <small>{order.id}</small>
    </p>

    <div className="">
      {order.basket?.map((item) => (
        <div key={item.id} className="flex space-x-1 items center pt-2">
          <img src={item.image} alt="item" className="h-24 w-24 rounded-md" />
          <div className="w-full">
            <p className="font-medium">{item.title}</p>
            <p className="font-semibold">{EURO_FORMAT.format(item.price)}</p>

          </div>
        </div>
      ))}
    </div>
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
      }),
    ),
  }).isRequired,
};

export default OrderItem;
