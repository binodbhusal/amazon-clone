import React from 'react';
import './Home.scss';
import Product from '../product/Product';

const Home = () => (
  <div className="home">
    <div className="home-container">
      <img className="home-image" src="./background_image.webp" alt="background-img" />
      <div className="home-row">
        <Product
          id={123}
          title="Smart Watches for Women, 1.91 HD Fitness Tracker Watch with Blood Pressure/Heart Rate Monitor, Bluetooth 5.3 Make Calls Smart Watch for Android/iOS Phones, IP68 Waterproof Fitness Watch for Women"
          price={370.00}
          rating={3}
          image={{
            url: 'https://m.media-amazon.com/images/I/81v5g3tFvbL._AC_SX679_.jpg',
            alt: 'smart-watch-image',
          }}
        />
        <Product
          id={345}
          title="findway Ski Goggles OTG - Over Glasses Snow/Snowboard Goggles for Men, Women & Youth - 100% UV Protection"
          price={70.56}
          rating={4}
          image={{
            url: 'https://m.media-amazon.com/images/I/61srCRYbeQL._AC_SX679_.jpg',
            alt: 'sun-glass-image',
          }}
        />
      </div>
      <div className="home-row">
        <Product
          id={356}
          title="Acer Aspire 5 A515-56-347N Slim Laptop - 15.6"
          price={29.99}
          rating={4}
          image={{
            url: 'https://m.media-amazon.com/images/I/71pvhTrmZDL._AC_SX679_.jpg',
            alt: 'Accer-laptop.image',
          }}
        />
        <Product
          id={367}
          title="Queen Size 4 Piece Sheet Set"
          price={29.99}
          rating={3}
          image={{
            url: 'https://m.media-amazon.com/images/I/61nY9nYn30L._AC_SX679_.jpg',
            alt: 'Sheet Set Image',
          }}
        />
        <Product
          id={389}
          title="Acer Aspire 5 A515-56-347N Slim Laptop - 15.6"
          price={370.00}
          rating={3}
          image={{
            url: 'https://m.media-amazon.com/images/I/61PwVKrXe3L._AC_SX679_.jpg',
            alt: 'smart-watch-image',
          }}
        />
      </div>
      <div className="home-row">
        <Product
          id={399}
          title="LG FHD 32-Inch Computer Monitor 32ML600M-B, IPS with HDR 10 Compatibility, Black
          Roll over image to zoom in
          LG FHD 32-Inch Computer Monitor 32ML600M-B, IPS with HDR 10 Compatibility, Black"
          price={199.78}
          rating={3}
          image={{
            url: 'https://m.media-amazon.com/images/I/81U+MhwN2OL._AC_SY300_SX300_.jpg',
            alt: 'game-pc-image',
          }}
        />
      </div>

    </div>
  </div>
);
export default Home;
