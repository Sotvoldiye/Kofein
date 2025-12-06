import { useParams } from "react-router-dom";
import {
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
} from "../lib/api/api";
import QuantitySelector from "../components/QuantitySelector";

export default function CategoryPage() {
  const { id } = useParams();

  const { data: products, isLoading } = useGetProductsByCategoryQuery(id);
  const { data: categories } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading...</p>;

  const category = categories?.find((c) => String(c.id) === String(id));

  return (
    <div>
      <h2 className="text-[18px] text-gray-700 mb-2">
        {category ? category.title : "Kategoriya"}
      </h2>

      <p className="text-[14px] text-gray-600 mb-4">
        {products?.length} mahsulot
      </p>

      <ul className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <li
            key={p.id}
            className="
              bg-white rounded-2xl border-2 border-transparent 
              hover:border-[#1E7C1E]  transition 
              overflow-hidden group
            "
          >
            <img
              src={p.image}
              alt=""
              className="
                w-full h-[240px] object-cover rounded-t-xl
                transition-transform duration-300
                group-hover:scale-105
              "
            />

            <div className="mt-[10%] px-3 pb-3">
              <p className="text-[17px]">{p.title}</p>

              <p className="truncate text-[15px] text-gray-600">
                {p.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                {" "}
                <p>{p.price} so'm</p> <QuantitySelector product={p}/>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
