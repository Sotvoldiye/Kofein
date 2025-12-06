import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
    }),
    getProductsByCategory: builder.query({
      query: (categoryId) => `/products?categoryId=${categoryId}`,
    }),

    createOrder: builder.mutation({
      query: () => "/categories",
    }),
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
    getProductsByCategory: builder.query({
      query: (categoryId) => `/products?categoryId=${categoryId}`,
    }),
getProductsByIds: builder.query({
  query: (ids) => `/products?ids=${ids.join(",")}`,
}),


    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"], // agar boshqa joyda buyurtmalarni ko‘rsatayotgan bo‘lsangiz, cache yangilansin
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetProductsByIdsQuery
} = api;
