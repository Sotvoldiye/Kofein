import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ProfileNav() {
  const { pathname } = useLocation();

  const items = [
    { path: "/profile", label: "Shaxsiy ma'lumotlar" },
    { path: "/profile/orders", label: "Buyurtmalar" },
    { path: "/category/1", label: "Asosiy sahifaga qaytish" },

  ];

  return (
    <nav className="w-[20%] h-[100vh] flex flex-col gap-3 flex-shrink-0 overflow-hidden bg-[rgb(160,207,165)] pl-7 pt-7">

      {items.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-2 
              pl-4 mr-6 py-2 rounded-xl transition
              ${
                isActive
                  ? "bg-[#1E7C1E] text-white"
                  : "bg-transparent hover:bg-[#8FC792]"
              }
            `}
          >
            {item.label}
          </Link>
        );
      })}

    </nav>
  );
}
