import { useStateValue } from '../context';
import './Checkout.scss';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

const Checkout = () => {
  const [{ basket, id, user }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img className="banner" src="https://m.media-amazon.com/images/G/01/GiftCards/2024/Q1/VX-2409/EN_Evergreen_AGCLP_1_Desktop_GCLP_Hero_3400x680._SX3000_QL85_.jpg" alt="checkout-banner" />
        <h3>
          Hello,
          { user?.email }
        </h3>
        <h1 className="checkout-title">Shopping Cart</h1>

        {basket.map((item) => (
          <CheckoutProduct
            key={id}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
          />
        ))}

      </div>
      <div className="checkout-right">
        <h2>Subtotal</h2>
        <Subtotal />
      </div>

    </div>
  );
};
export default Checkout;
