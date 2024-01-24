import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags:['Products']
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
      }),
      invalidatesTags:['Products']
    }),
    updateProduct : builder.mutation({
        query : (data)=>({
            url : `${PRODUCT_URL}/${data.productId}`,
            method : "PUT",
            body : data
        }),
        invalidatesTags:['Products']
    }),
    deleteProduct : builder.mutation({
        query : (productId)=>({
            url:`${PRODUCT_URL}/${productId}`,
            method : "DELETE"
        }),
        invalidatesTags:['Products']
    })
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery,useCreateProductMutation,useUpdateProductMutation } = productsApiSlice;
