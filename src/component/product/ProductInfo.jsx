import PropTypes from 'prop-types';

const ProductInfo = ({ product }) => (
  <>
    <p className="text-sm text-cyan-500 mt-1">FREE Returns</p>
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
  </>
);
export default ProductInfo;
ProductInfo.propTypes = {
  product: PropTypes.shape({
    brand: PropTypes.string,
    product_benefit: PropTypes.string,
    description: PropTypes.string,

    // Add more properties as needed
  }).isRequired,
};
