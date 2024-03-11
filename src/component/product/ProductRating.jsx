import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa6';

const ProductRating = ({ avgRating, ratings, showAvgRating }) => {
  const startNumber = avgRating;
  const ratingNumber = ratings;
  return (
    <div className="flex mt-2 mb-2">
      {showAvgRating
           && <span className="text-sm text-cyan-500 mr-1 font-medium">{avgRating.toFixed(1)}</span>}

      {Array.from({ length: startNumber }, (_, i) => (
        <FaStar key={i} className="stroke-[#f18618] fill-[#f18618] h-[20px] text-[16px]" />
      ))}
      {Array.from({ length: 5 - startNumber }, (_, i) => (
        <FaStar key={i} className="stroke-[#f18618] fill-gray-500 text-[16px] h-[20px]" />
      ))}
      <span className="text-cyan-500 text-sm ml-1 font-medium">
        {ratingNumber}
        {' '}
        Ratings
      </span>
    </div>
  );
};

export default ProductRating;

ProductRating.propTypes = {
  ratings: PropTypes.number,
  avgRating: PropTypes.number,
  showAvgRating: PropTypes.bool,
};

ProductRating.defaultProps = {
  ratings: 0,
  avgRating: 0,
  showAvgRating: true,
};
