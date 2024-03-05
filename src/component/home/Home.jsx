/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Category from '../product/Category';
import Carousel from './Carousel';
import CarouselCategory from './CarouselCategory';
import categoryData from '../../data/category.json';
import CarouselProduct from './CarouselProduct';

const Home = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryId) => navigate(`/category/${categoryId}`);
  return (
    <div className="home">
      <div className="home-container">
        <Carousel />
        <div
          className="px-4 grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3"

        >
          {categoryData.category.map((category) => {
            const categoryDetails = categoryData.categoryDetails[category.id];
            return (
              <div
                onClick={() => handleCategoryClick(category.id)}
                aria-label="category"
                key={category.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Space') {
                    handleCategoryClick(category.id);
                  }
                }}
              >
                <Category
                  title={categoryDetails.title}
                  image={categoryDetails.image}
                  link={categoryDetails.link}
                />
              </div>
            );
          })}
        </div>
        <CarouselProduct />
        <div className="bg-white">
          <CarouselCategory />
        </div>
        <img className="h-[200px] mx-auto object-contain" src="https://m.media-amazon.com/images/G/01/GiftCards/2024/Q1/VX-2409/EN_Evergreen_AGCLP_1_Desktop_GCLP_Hero_3400x680._SX3000_QL85_.jpg" alt="checkout-banner" />
      </div>
    </div>
  );
};
export default Home;
