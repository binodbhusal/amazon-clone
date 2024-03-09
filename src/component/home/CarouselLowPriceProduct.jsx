import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import apiCall from '../utils/callApi';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const CarouselLowPriceProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productResults = await apiCall('data/products.json');
        const productsArray = Object.values(productResults);
        setProducts(productsArray);
      } catch (error) {
        throw Error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []);
  const bestDeal = products && products.length > 0
    ? shuffleArray(products.filter((product) => product.price < 25 && product.badge !== 'seller')).slice(0, 20)
    : [];
  return (
    <div className="bg-white mt-4 pt-6 pb-12">
      <div className="text-xl font-semibold mb-2 ml-4">
        Deals Under $25
      </div>
      {products && products.length > 0 && (
      <Swiper
        slidesPerView={7}
        spaceBetween={2}
        navigation
        className=""
        modules={[Navigation]}
      >
        {bestDeal && bestDeal.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={`products${item.id}`} className="w-[300px] h-[150px] object-contain" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      )}
    </div>
  );
};
export default CarouselLowPriceProduct;
