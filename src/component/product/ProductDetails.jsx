/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';
import ProductBadge from './ProductBadge';
import ProductRating from './ProductRating';
import { EURO_FORMAT } from '../utils/constant';

const ProductDetails = ({ product }) => (
  <div className="mb-1">
    <div className="text-xl lg:text-2xl font-medium mb-1">{product.title}</div>
    <div className="text-sm lg:text-base mb-1">
      By
      <span className="text-cyan-500 font-medium ml-2">{product.brand}</span>
    </div>
    <div className="text-sm lg:text-base border-b mb-4"><ProductRating avgRating={product.avgRating} ratings={product.ratings} /></div>
    <div className="mb-4">
      <ProductBadge badge={product.badge} />
    </div>
    <div className="relative text-xl xl:text-2xl font-medium text-gray-700">
      <span className="absolute top[-15px] text-sm">{EURO_FORMAT.formatToParts(product.price)[0].value}</span>
      <span className="ml-3 text-[30px]">{EURO_FORMAT.formatToParts(product.price).slice(1).map((part) => part.value).join('')}</span>
      <p className="text-sm text-cyan-500 mt-1">FREE Returns</p>
    </div>
    <table className="table-auto w-full">
      <tbody>
        <tr>
          <td className="font-bold mr-6 mt-2">Brand</td>
          <td className="text-base">
            {product.brand}
          </td>
        </tr>
        <tr>
          <td className="font-bold mr-4 mt-2">
            Product
            Benefits
          </td>
          <td className="text-xs lg:text-base mb-1">
            {product.product_benefit}
          </td>
        </tr>
      </tbody>
    </table>
    <div className="border-b mb-4 mt-3" />
    <div className="text-base lg:text-lg mt-1">
      <h4 className="font-bold text-lg">About this item</h4>
      <span className="text-base">
        {' '}
        {product.description}
      </span>
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
    // Add more properties as needed
  }).isRequired,
};
