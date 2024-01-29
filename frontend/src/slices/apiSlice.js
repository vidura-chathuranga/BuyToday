import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { removeCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);
  if (result.error && result.error.status === 401) {
    api.dispatch(removeCredentials());
  }
  return result;
}
export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Products", "Order", "User"],
  endpoints: (builder) => ({}),
});
