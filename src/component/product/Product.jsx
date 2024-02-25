import React from 'react';
import './Product.scss';
import PropTypes from 'prop-types';
import { useStateValue } from '../context';

const Product = ({
  id, title, image, price, rating,
}) => {
  const [{ basket }, dispatch] = useStateValue();
  console.log('this is the basket:', basket);
  const handleAddToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
              <p key={index}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image.url} alt="product-1" />
      <button type="button" onClick={handleAddToBasket}>Add to basket</button>
    </div>
  );
};
Product.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
};
Product.defaultProps = {
  id: PropTypes.number,
  title: 'Default Title',
  price: 0,
  rating: 0,
  image: {
    url: 'default-image-url',
    alt: 'Default Alt Text',
  },
};
export default Product;
