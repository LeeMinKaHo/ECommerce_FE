import React from 'react';

export const OrderDetailPage = () => {
  const order = {
    id: '#001',
    date: '2025-05-17',
    status: 'Completed',
    customer: {
      name: 'Manuel',
      email: 'manuel@email.com',
      phone: '0909-999-999',
      address: '123 Lê Lợi, Quận 1, TP.HCM',
    },
    items: [
      { name: 'Tai nghe Bluetooth', quantity: 1, price: 100 },
      { name: 'Ốp lưng iPhone', quantity: 2, price: 10 },
    ],
    total: 120,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng {order.id}</h1>

      {/* Thông tin đơn hàng */}
      <div className="mb-6 bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Thông tin đơn hàng</h2>
        <p><strong>Ngày đặt:</strong> {order.date}</p>
        <p><strong>Trạng thái:</strong> <span className="text-green-600">{order.status}</span></p>
      </div>

      {/* Thông tin khách hàng */}
      <div className="mb-6 bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Thông tin khách hàng</h2>
        <p><strong>Tên:</strong> {order.customer.name}</p>
        <p><strong>Email:</strong> {order.customer.email}</p>
        <p><strong>Điện thoại:</strong> {order.customer.phone}</p>
        <p><strong>Địa chỉ:</strong> {order.customer.address}</p>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Sản phẩm đã mua</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Sản phẩm</th>
              <th className="text-left p-2">Số lượng</th>
              <th className="text-left p-2">Giá</th>
              <th className="text-left p-2">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.price}</td>
                <td className="p-2">${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right mt-4 font-semibold text-lg">
          Tổng tiền: ${order.total}
        </div>
      </div>
    </div>
  );
};
