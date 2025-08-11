import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.lilia-ai.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Patients", "Scan", "ScansResult", "Chat"],
});
