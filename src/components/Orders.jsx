import React from "react";
import { useCartStore } from "../lib/store";
import { useCreateOrderMutation } from "../lib/api/api";
import toast from "react-hot-toast";

export default function Orders() {
  const cart = useCartStore((s) => s.cart);
  const items = Object.values(cart).filter((p) => p.count > 0);
  const removeFrom = useCartStore((s) => s.removeFrom);
  const clearCart = useCartStore((s) => s.clearCart); // savatni tozalash uchun
  // beckend bo'lmaganligi uchun localstorage ga userni saqlab osha yerdan ishlatyapman
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const id = user?.id;

  const [createOrder, { isLoading, isSuccess, isError }] =
    useCreateOrderMutation();

  // Jami hisoblash
  const totalQuantity = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.count * item.price,
    0
  );

  const handleOrder = async (e) => {
    e?.preventDefault();
    if (items.length === 0) {
      toast.error("Savat bo'sh! Iltimos, mahsulot qo'shing.");
      return;
    }

    // Serverga jo'natiladigan format
    const orderData = {
      userId: id,
      items: items.map((item) => ({
        productId: item.id,
        sizeId: item.selectedSizeId || 1, // agar size tanlansa, aks holda 1
        quantity: item.count,
        price: item.price,
      })),
      totalQuantity,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await createOrder(orderData);
      toast.success("Buyurtmangiz muvaffaqiyatli qabul qilindi!");
      clearCart();
    } catch (error) {
      toast.error("Xato yuz berdi");
    }
  };

  return (
    <div className="flex">
      <div className="w-full ">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-basket-shopping text-[#8FC792]"></i>
            <p>Savat</p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              className="bg-[#1E7C1E] py-[1px] px-[8px] rounded-[8px] text-white font-bold"
            >
              {totalQuantity}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[80%_20%] gap-4 items-center">
          {/* Mahsulotlar ro'yxati */}
          {items.length > 0 && (
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-4">
                {items.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center gap-4 bg-white rounded-xl p-3 min-w-[280px] shadow-sm "
                  >
                    <img
                      src={o.image || "/placeholder.jpg"}
                      alt={o.title}
                      className="w-[60px] h-[60px] rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm">{o.title}</p>
                      <p className="text-sm text-gray-600">
                        {o.count} × {o.price.toLocaleString()} so'm
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFrom(o.id)}
                      className=" p-2 rounded-lg transition"
                    >
                      <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {items.length === 0 && (
            <div className="text-start text-gray-500 p-0 m-0">Savat bo'sh</div>
          )}

          {/* Jami va tugma */}
          <div className="flex items-center w-full gap-4">
            <div className="flex flex-col">
              <p className="text-lg text-gray-700">Jami:</p>
              <p className="w-full text-green-600">
                {totalPrice.toLocaleString()} so'm
              </p>
            </div>

            <button
              type="button"
              onClick={handleOrder}
              disabled={isLoading}
              className={`px-4 py-2 rounded-xl font-bold text-white transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 active:scale-95"
              }`}
            >
              {isLoading ? "Yuborilmoqda..." : "Buyurtma berish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
