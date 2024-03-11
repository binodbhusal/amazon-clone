/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { GrLocation } from 'react-icons/gr';
import apiCall from '../utils/callApi';
import ProductDetails from './ProductDetails';
import { EURO_FORMAT, formatDeliveryDate } from '../utils/constant';
import { addCart } from '../../Redux/cartSlice';
import ProductInfo from './ProductInfo';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const getProduct = () => {
    apiCall('data/products.json')
      .then((producResults) => {
        setProduct(producResults[id]);
      });
  };

  const addQuantityToProduct = () => {
    setProduct(product.quantity = quantity);
    return { ...product, quantity };
  };
  const handelAddtoCart = () => {
    dispatch(addCart(addQuantityToProduct()));
  };
  useEffect(() => {
    getProduct();
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (product
    && (
    <div className="bg-amazonclone-background">
      <div className="min-w[1000px] max-w-[1500px]  bg-white py-16">
        <div className="grid grid-cols-11 gap-2 px-8">
          <div className="col-span-1 rounded">
            <div className="grid grid-rows-5 gap-3 pt-2 ml-16">
              {product.image
              && product.image.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  alt={`Product${index + 1}`}
                  onMouseEnter={() => handleImageClick(index)}
                  className={`w-full  object-contain rounded-md cursor-pointer ${index === selectedImageIndex ? 'selected' : ''}`}
                />

              ))}
            </div>
          </div>
          {/* left */}
          <div className="col-span-4  rounded bg-white pt-2">
            <img src={`${product.image[selectedImageIndex]}`} alt="product-img" className="w-full  object-contain" />
          </div>
          {/* center */}
          <div className="col-span-4 px-4 rounded bg-white overflow-hiddden">
            <ProductDetails product={product} titleFontSize="2xl" />
            <ProductInfo product={product} />
          </div>
          {/* right */}
          <div className="col-span-2 bg-white flex-shrink-0 h-[80vh] border border-gray-200 rounded-md px-4 py-4">
            <div className="relative text-xl xl:text-2xl font-medium text-gray-700">
              <span className="absolute top[-15px] text-sm">{EURO_FORMAT.formatToParts(product.price)[0].value}</span>
              <span className="ml-3 text-[30px]">{EURO_FORMAT.formatToParts(product.price).slice(1).map((part) => part.value).join('')}</span>
              <p className="text-sm text-cyan-500 mt-1">FREE Returns</p>
            </div>
            <p className="text-sm text-gray-700 mt-1 font-medium">
              Delivery
              <span className="ml-1 font-bold">{formatDeliveryDate()}</span>
            </p>
            <p>
              <span className="text-sm text-gray-700 mt-1 font-medium">
                Order within
                <span className="text-green-700 font-medium"> 23 hrs 45 mins</span>
              </span>
            </p>
            <div className=" flex mt-1">
              <GrLocation className="text-[14px] mr-1" />
              <span className="text-xs text-cyan-500">Delivery to Portugal</span>
            </div>
            <div className="text-sm xl:text-xl text-green-700 font-medium py-2">In Stock </div>
            <div className="text-sm xl:text-base font-semibold">
              <select
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className=" mt-2 mb-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 hover:bg-gray-100 cursor-pointer  overflow-auto"
              >
                {[...Array(30)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <Link to="/cart">
              <button
                type="button"
                className="bg-[#ffd712] btn rounded-full hover:bg-yellow-400"
                onClick={handelAddtoCart}
              >
                Add To Cart
              </button>
            </Link>
            <Link to="/payment">
              <button
                type="button"
                className="bg-[#ffa41c] mt-3 hover:bg-orange-400 btn rounded-full"
                onClick={handelAddtoCart}
              >
                Buy Now
              </button>
            </Link>

            <div className="table tex-xs pt-4">
              <div className="table-row">
                <div className="table-cell text-sm mr-4 font-medium">Ships from</div>
                <div className="table-cell text-sm font-medium">Amazon</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-sm font-medium mr-4">Sold by</div>
                <div className="table-cell text-sm text-cyan-600 font-medium">{product.brand}</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-sm font-medium mr-4">Returns</div>
                <div className="table-cell text-sm text-cyan-600 font-medium">Eligible for Return, Refund, or Replacement within 30 days of receipt</div>
              </div>
              <div className="table-row">
                <div className="table-cell text-sm font-medium mr-4">Payment</div>
                <div className="table-cell text-sm text-cyan-600 font-medium">Secure transaction</div>
              </div>
            </div>
            <div className="pt-4 text-sm font-medium text-gray-700">
              <input type="checkbox" className="mr-2 rounded border-gray-400" />
              Add a gift receipt for easy returns.
            </div>
          </div>
        </div>
        <div className="px-8">
          <div className="border-b mt-6 mb-4 w-full h-full" />

          <h4 className="text-2xl font-bold mb-4 mt-4">From the brand</h4>
          <img src={`${product.brand_image}`} alt="product-img" className="w-full h-full" />

        </div>

      </div>
    </div>
    )

  );
};

export default ProductPage;
