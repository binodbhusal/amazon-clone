import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import bestsellCategoryImages from '../../data/carousel_best_sell_image.json';

const CarouselProduct = () => (
  <div className="bg-white m-4 py-6">
    <div className="text-xl font-semibold mb-2 ml-4">
      Best Sellers
    </div>
    <Swiper
      slidesPerView={7}
      spaceBetween={2}
      navigation
      className=""
      modules={[Navigation]}
    >
      {
        bestsellCategoryImages.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/product/${item.id}`}>
              <img src={item.image.url} alt={item.image.alt} className="w-[300px] h-[150px] object-contain" />
            </Link>
          </SwiperSlide>
        ))
    }
    </Swiper>
  </div>
);

export default CarouselProduct;
