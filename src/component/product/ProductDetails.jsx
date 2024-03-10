/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';
import ProductBadge from './ProductBadge';
import ProductRating from './ProductRating';
import { EURO_FORMAT } from '../utils/constant';

const ProductDetails = ({ product, titleFontSize }) => (
  <div className="mb-1">
    <div className={`text-xl lg:text-${titleFontSize} font-medium mb-1`}>{product.title}</div>
    <div className="text-sm lg:text-base mb-1">
      By
      <span className="text-cyan-500 font-medium ml-2">{product.brand}</span>
    </div>
    <div className="text-sm lg:text-base border-b mb-4"><ProductRating avgRating={product.avgRating} ratings={product.ratings} /></div>
    <div className="mb-4">
      <ProductBadge badge={product.badge} />
    </div>
    <div className="relative font-medium text-gray-700">
      <span className="absolute top[-15px] text-sm">{EURO_FORMAT.formatToParts(product.price)[0].value}</span>
      <span className="ml-3 text-[30px]">{EURO_FORMAT.formatToParts(product.price).slice(1).map((part) => part.value).join('')}</span>
    </div>
  </div>
);
export default ProductDetails;
ProductDetails.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    brand: PropTypes.string,
    avgRating: PropTypes.number,
    price: PropTypes.number,
    product_benefit: PropTypes.string,
    badge: PropTypes.string,
    description: PropTypes.string,
    ratings: PropTypes.number,
  }).isRequired,
  titleFontSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']),
};
ProductDetails.defaultProps = {
  titleFontSize: 'xl',
};
