import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import OrderItem from './OrderItem'; // Assuming you have a component to display individual orders
import { useStateValue } from '../context';
import './Orders.scss';

const OrdersPage = () => {
  const [{ user }] = useStateValue();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      console.log('Fetching orders for user:', user);

      if (user?.uid) {
        const ordersCollection = collection(db, 'users', user.uid, 'orders');
        const ordersSnapshot = await getDocs(ordersCollection);

        console.log('ordersSnapshot:', ordersSnapshot);

        const ordersData = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('ordersData:', ordersData);

        setOrders(ordersData);
      } else {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [user]);
  return (
    <div className="orders">
      <h2>Your Orders</h2>
      {orders?.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersPage;
