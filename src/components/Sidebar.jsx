import React from "react";
import { useGetCategoriesQuery } from "../lib/api/api";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { pathname } = useLocation();

  return (
    <nav className="w-[20%] flex flex-col gap-3 flex-shrink-0 overflow-hidden bg-[rgb(160,207,165)] pl-7">
      <h2 className="mt-7  font-medium">Kategoryalar</h2>

      {isLoading
        ? "Loading..."
        : categories?.map((cat) => {
            const isActive = pathname === `/category/${cat.id}`;

            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`
    flex items-center gap-2 
    pl-4 mr-6 py-2 rounded-xl transition
    ${
      isActive ? "bg-[#1E7C1E] text-white" : "bg-transparent hover:bg-[#8FC792]"
    }
  `}
              >
                {cat.title}
              </Link>
            );
          })}
    </nav>
  );
}
