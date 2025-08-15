import { createAPI } from "../redux/createAPI";

const authApi = createAPI.injectEndpoints({
  endpoints: (build) => ({
    signupApi: build.mutation({
      query: ({ formData }) => {
        return {
          url: `signup`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Patients", "Scan", "ScansResult", "Chat"]
    }),
    loginpApi: build.mutation({
      query: ({ formData }) => {
        return {
          url: `login`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Patients", "Scan", "ScansResult", "Chat"]
    }),
    profileApi: build.mutation({
      query: ({ formData }) => {
        return {
          url: `doctor/profile`,
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useSignupApiMutation,
  useLoginpApiMutation,
  useProfileApiMutation,
} = authApi;
