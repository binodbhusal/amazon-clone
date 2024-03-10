/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ProductBadge from './ProductBadge';
import ProductRating from './ProductRating';
import { formatDeliveryDate } from '../utils/constant';

const ProductCard = ({
  product,
}) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div className="pt-4 pb-8 rounded-md px-5 border border-neutral-300 bg-white">
      <div role="button" tabIndex={0} onClick={() => handleProductClick(product.id)}>
        <img src={product.image} alt="product" className="object-contain h-[40vh] w-full" />
        <div className="text-base font-medium pt-4">
          <div
            className="line-clamp-3 hover:text-orange-500"
          >
            {product.title}
          </div>
          <ProductRating
            ratings={product.ratings}
            avgRating={product.avgRating}
            showAvgRating={false}
          />
          <ProductBadge badge={product.badge} />
          <p className="relative mt-3">
            <small className="absolute top[-15px]">€</small>
            <strong className="text-[25px] ml-3 mt-6 font-semibold">{product.price}</strong>
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-1">
        Delivery
        <span className="ml-1 font-bold">{formatDeliveryDate()}</span>
      </p>
      <p className="text-xs text-gray-700 mt-1">Ships to Portugal</p>
    </div>
  );
};
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
    avgRating: PropTypes.number,
    attribute: PropTypes.string,
    badge: PropTypes.string,
    description: PropTypes.string,
    ratings: PropTypes.number,

    image: PropTypes.shape({
    }),
  }).isRequired,
};

export default ProductCard;
