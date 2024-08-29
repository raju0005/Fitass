
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Welcome", "Dashboard", "Profile", "Add Activity"],
  endpoints: () => ({}),
});
