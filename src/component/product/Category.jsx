import React from 'react';

import PropTypes from 'prop-types';

const Category = ({
  title, image, link,
}) => (
  <div className=" h-[350px] md:h-[420px] lg:h-[420px] bg-white px-4 pt-3 relative z-20">
    <p className="text-lg lg:text-xl font-semibold mb-4 mt-4">{title}</p>
    <img src={image.url} alt="product-1" className="h-1/2 md:h-2/3 lg:h-2/3 object-fit-contain" />
    <p className="mt-4">{link}</p>
  </div>
);
Category.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
};
Category.defaultProps = {
  title: 'Default Title',
  link: 'Default Link',
  image: {
    url: 'default-image-url',
    alt: 'Default Alt Text',
  },
};
export default Category;
