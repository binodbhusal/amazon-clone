/* eslint-disable react/no-array-index-key */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { useNavigate, createSearchParams } from 'react-router-dom';

const CarouselCategory = () => {
  const navigate = useNavigate();
  const categories = ['Deals', 'Amazon', 'Computers', 'Fashion', 'Home & Kitchen', 'Home & Kitchen'];

  const searchCategory = (categoryOption) => {
    navigate({
      pathname: '/search',
      search: `${
        createSearchParams({
          categoryOption: `${categoryOption}`,
        })
      }`,
    });
  };
  return (
    <div className=" m-4 py-6">
      <div className="text-xl font-semibold mb-2 ml-4">
        Shop by Category
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        navigation
        className=""
        modules={[Navigation]}
      >
        {
          categories.map((category, i) => (
            <SwiperSlide key={i} onClick={() => searchCategory(category)}>
              <img src={`../images/category_${i}.webp`} alt="first-carousel" className="w-[250px] h-[150px] object-contain" />
            </SwiperSlide>

          ))
}

      </Swiper>
    </div>
  );
};
export default CarouselCategory;
