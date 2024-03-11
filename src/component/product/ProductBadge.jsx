import PropTypes from 'prop-types';

const ProductBadge = ({ badge }) => {
  if (badge === 'choice') {
    return (
      <span className="text-xs xl:text-sm bg-slate-800 text-white p-1">
        Amazon
        <span className="text-orange-500"> choice</span>
      </span>
    );
  }
  if (badge === 'seller') {
    return (
      <span className="text-xs xl:text-sm bg-orange-400 text-white p-1">Best seller</span>
    );
  }
  if (badge === 'limited') {
    return (
      <span className="text-xs xl:text-sm bg-red-600 text-white p-1">Limited Time Deal</span>

    );
  }
  return (
    <div />
  );
};
export default ProductBadge;
ProductBadge.propTypes = {
  badge: PropTypes.string,
};
ProductBadge.defaultProps = {
  badge: 'Amazon choice',

};
