import React from "react";
import { useGetOrdersQuery, useGetProductsByIdsQuery } from "../lib/api/api";

export default function ProfileOrder() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const { data: orders } = useGetOrdersQuery();

  // Faqat joriy user buyurtmalari
  const userOrders = orders
    ?.filter((order) => order.userId === user?.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const productIds =
    userOrders?.flatMap((order) => order.items.map((i) => i.productId)) || [];
  const { data: products } = useGetProductsByIdsQuery(productIds);

  if (!userOrders?.length) return <p>Sizda buyurtmalar mavjud emas</p>;

  // Kun bo'yicha guruhlash
  const ordersByDay = userOrders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString(); // YYYY-MM-DD emas, user locale bo'yicha
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});



  return (
    <div className="flex flex-col gap-6 p-4">
      {Object.entries(ordersByDay).map(([date, dayOrders]) => {
            // Sana bo'yicha umumiy narx
  const dayTotal = dayOrders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((s, item) => {
      const product = products?.find((p) => p.id === item.productId);
      if (!product) return s;
      return s + item.quantity * product.price;
    }, 0);

    return sum + orderTotal;
  }, 0);
        return(
        <div key={date} className="bg-gray-100 p-4  rounded-xl">
          <h3 className="font-semibold mb-2">{date}</h3>
<div className="flex flex-col gap-4">
   {dayOrders.map((order) => (
            <div key={order.id} className="bg-white p-3 rounded-lg ">
              <p className="font-medium">Buyurtma ID: {order.id}</p>
              <p className="text-sm text-gray-500">
                Vaqti: {new Date(order.createdAt).toLocaleTimeString()}
              </p>
                {order.items.map((item) => {
                  const product = products?.find(
                    (p) => p.id === item.productId
                  );
                  if (!product) return <p key={item.productId}>Loading...</p>;
                  return (
                    <div
                      key={item.productId}
                      className="flex items-center gap-2 mt-2"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <p>
                        {product.title} — {item.quantity} ×{" "}
                        {product.price.toLocaleString()} so'm
                      </p>
                    </div>
                  );
                })}
              </div>
          ))}
          <p>Umumiy summa {dayTotal} so'm</p>
</div>
       
        </div>
      )})}
    </div>
  );
}
