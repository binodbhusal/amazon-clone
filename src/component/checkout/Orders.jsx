import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import OrderItem from './OrderItem'; // Assuming you have a component to display individual orders

import './Orders.scss';

const OrdersPage = () => {
  const { user } = useSelector((state) => state.cart);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.uid) {
        const ordersCollection = collection(db, 'users', user.uid, 'orders');
        const ordersSnapshot = await getDocs(ordersCollection);

        const ordersData = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setOrders(ordersData);
      } else {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [user]);
  return (
    <div className="px-24 py-8">
      <h2 className="font-bold text-xl">Your Orders</h2>
      {orders?.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersPage;
