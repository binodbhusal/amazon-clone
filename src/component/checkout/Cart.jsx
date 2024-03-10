import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../Redux/cartSlice';
import { EURO_FORMAT, calculateSubtotal } from '../utils/constant';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basket = useSelector((state) => state.cart.basket);
  const user = useSelector((state) => state.cart.user);
  const itemNumber = useSelector((state) => state.cart.productNumber);
  const subtotal = calculateSubtotal(basket);
  const handleCheckout = () => {
    if (user) {
      navigate('/payment');
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      {basket.length === 0 ? (
        <div className="py-24 flex bg-white">
          <img
            src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"
            alt=""
            className="w-[400px] object-contain"
          />
          <div>
            <p className="text-2xl font-semibold text-gray-900">Your Amazon Cart is empty.</p>
            <Link to="/">
              <p className="text-base font-medium text-cyan-500">Shop today&apos;s deals</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6 p-4">

          {/* left */}
          <div className="col-span-9 bg-white px-4">
            <div className="flex justify-between px-6 pt-6 border-b">
              <span className="font-semibold text-3xl text-gray-700 pb-4">
                <span>Shopping Cart</span>
              </span>
              <span className="mt-[30px]  text-sm text-gray-600">Price</span>
            </div>

            { basket.map((product) => (
              <div className="grid grid-cols-9 border-b p-3" key={product.id}>
                <div className="col-span-2">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt="productimage" className="h-[180px] w-[180px] object-contain" />
                  </Link>
                </div>
                <div className="col-span-6">
                  <p className="font-medium text-xl line-clamp-2">
                    {product.title}
                  </p>
                  <div className="py-2">
                    <p className="text-sm text-green-700 font-medium">In Stock</p>
                    <input type="checkbox" className="mr-1 rounded border-gray-400" />
                    <span className="text-sm">This is a gift.</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold mr-1">Brand:</span>
                    {product.brand}
                  </p>
                  <div className="space-x-3 mt-3 flex divide-x-2 divide-gray-200 divide-w-2/3">
                    <div>
                      <button
                        type="button"
                        className="bg-gray-100 px-4  hover:bg-gray-200 border border-gray-300 hover:shadow-md hover:transition text-md rounded-l-md text-gray-700"
                        onClick={() => dispatch(decrementQuantity(product.id))}
                      >
                        -
                      </button>
                      <button type="button" disabled className="bg-gray-100 px-4   border border-gray-300 text-md  text-gray-700">{product.quantity}</button>
                      <button type="button" className="bg-gray-100 px-4  hover:bg-gray-200 border border-gray-300 hover:shadow-md hover:transition text-md rounded-r-md text-gray-700" onClick={() => dispatch(incrementQuantity(product.id))}>+</button>
                    </div>
                    <div>
                      <button type="button" className="bg-transparent ml-2 text-cyan-500 text-sm hover:underline" onClick={() => dispatch(removeFromCart(product.id))}>Delete</button>
                    </div>
                  </div>

                </div>
                <div className="col-span-1 text-right">
                  <span className="font-semibold text-xl">{EURO_FORMAT.format(product.price)}</span>
                </div>
              </div>
            ))}

            <div className="pb-4 flex justify-end">
              <div>
                <span className="text-xl font-medium text-gray-700">
                  Subtotal (
                  {itemNumber}
                  {' '}
                  items):
                </span>
                {' '}
                <span className="font-bold text-xl text-gray-900">{EURO_FORMAT.format(subtotal)}</span>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="col-span-3 bg-white h-[20vh] flex-shrink-0">
            <div className="px-6 pt-4">
              <div>
                <span className="text-xl font-medium text-gray-700">
                  Subtotal (
                  {itemNumber}
                  {' '}
                  items):
                </span>
                {' '}
                <span className="font-bold text-xl text-gray-900">{EURO_FORMAT.format(subtotal)}</span>
              </div>
              <input type="checkbox" className="mr-1 rounded border-gray-400" />
              <span className="text-sm">This order contains a gift.</span>
              <button
                type="button"
                className="btn bg-[#ffd712] btn rounded-md hover:bg-yellow-400 mt-4"
                onClick={handleCheckout}
              >
                Proceed to checkout
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
export default Cart;
