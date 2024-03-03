/* eslint-disable react/jsx-props-no-spreading */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import './Home.scss';
import { useNavigate, createSearchParams } from 'react-router-dom';

const Carousel = () => {
  const navigate = useNavigate();
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
  const swiperParams = {
    spaceBetween: 0,
    loop: true,
    pagination: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    modules: [Navigation, Autoplay],
    autoplay: {
      delay: 4000,
    },
  };
  return (
    <div className="h-[600px]  w-full mb-[-20%]">

      <Swiper {...swiperParams}>
        <SwiperSlide onClick={() => searchCategory('Deals')}>
          <img src="../images/carousel_image_1.webp" alt="first-carousel" className="cursor-pointer" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory('Amazon')}>
          <img src="../images/carousel_image_2.webp" alt="first-carousel" className="cursor-pointer" />
        </SwiperSlide>
        <SwiperSlide>
          <video autoPlay muted controls>
            <source src="../images/carousel_vid.mp4" type="video/mp4" className="cursor-pointer" />
            <track kind="captions" srcLang="en" label="English" />
          </video>
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory('Computers')}>
          <img src="../images/carousel_image_3.webp" alt="first-carousel" className="cursor-pointer" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory('Fashion')}>
          <img src="../images/carousel_image_4.webp" alt="first-carousel" className="cursor-pointer" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../images/carousel_images_5.webp" alt="first-carousel" className="cursor-pointer" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../images/carousel_images_6.webp" alt="first-carousel" className="cursor-pointer" />
        </SwiperSlide>
      </Swiper>

      <div
        className="swiper-button-next"
        style={
          {
            color: '#131921',
            fontSize: '12px',
            position: 'absolute',
            top: '33%',
            paddingRight: '3%',
          }
        }
      />
      <div
        className="swiper-button-prev"
        style={
          {
            color: '#131921',
            fontSize: '12px',
            position: 'absolute',
            top: '33%',
            paddingLeft: '3%',
          }
        }
      />
    </div>
  );
};
export default Carousel;
