import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: `/users?name=${body.name}&password=${body.password}`,
        method: "GET"
      }),
      transformResponse: (res) => res[0] || null
    }),

    loginAdmin: builder.mutation({
      query: (body) => ({
        url: `/admins?name=${body.name}&password=${body.password}`,
        method: "GET"
      }),
      transformResponse: (res) => res[0] || null
    })
  })
});

export const { useLoginUserMutation, useLoginAdminMutation } = authApi;
