const BASE_URL = '..';
export default BASE_URL;
export const EURO_FORMAT = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});
export const formatDeliveryDate = () => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 10);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const formattedDate = `${daysOfWeek[deliveryDate.getDay()]}, ${months[deliveryDate.getMonth()]} ${deliveryDate.getDate()}`;

  return formattedDate;
};
// constants.js
// eslint-disable-next-line max-len
export const calculateSubtotal = (basket) => basket.reduce((subtotal, product) => subtotal + (product.price * product.quantity), 0);
