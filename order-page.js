import React, { useEffect, useState } from 'react';

const OrderListing = () => {
  const [orders, setOrders] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => console.error('Error fetching orders:', error));
  };

  const filterOrders = (status) => {
    setRowCount(orders.filter(order => order.orderStatus.toUpperCase() === status.toUpperCase()).length);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td className="primary-text">{order.customerName}</td>
              <td className="primary-text">{order.orderDate} {order.orderTime}</td>
              <td>${order.amount}</td>
              <td className="primary-text">{order.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Count: {rowCount}</div>
      <div>
        <input type="checkbox" name="orders-new" onChange={() => filterOrders('New')} /> New
        <input type="checkbox" name="orders-packed" onChange={() => filterOrders('Packed')} /> Packed
        <input type="checkbox" name="orders-transit" onChange={() => filterOrders('InTransit')} /> In Transit
        <input type="checkbox" name="orders-delivered" onChange={() => filterOrders('Delivered')} /> Delivered
      </div>
    </div>
  );
};

export default OrderListing;
