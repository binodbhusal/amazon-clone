import PropTypes from 'prop-types';
import { useStateValue } from '../context';
import './CheckoutProduct.scss';

const CheckoutProduct = ({
  id, title, image, price, rating,
}) => {
  const [{ basket }, dispatch] = useStateValue();
  const handleRemoveFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id,
    });
  };
  return (
    <div className="checkout-product">
      <img className="checkout-product-image" src={image.url} alt="product" />
      <div className="checkout-product-info">
        <p className="checkout-product-title">{title}</p>
        <p>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkout-product-rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
              <p key={index}>⭐</p>
            ))}
        </div>
        <button type="button" onClick={() => handleRemoveFromBasket(basket)}>Remove from basket</button>
      </div>
    </div>
  );
};
CheckoutProduct.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
};
CheckoutProduct.defaultProps = {
  id: PropTypes.number,
  title: 'Default Title',
  price: 0,
  rating: 0,
  image: {
    url: 'default-image-url',
    alt: 'Default Alt Text',
  },
};
export default CheckoutProduct;
