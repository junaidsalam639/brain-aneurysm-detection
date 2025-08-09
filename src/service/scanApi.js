import { createAPI } from "../redux/createAPI";

const scanApi = createAPI.injectEndpoints({
  endpoints: (build) => ({
    getScans: build.query({
      query: ({ patient_id }) => `patients/${patient_id}/scans`,
      providesTags: ["Scan"],
    }),
    getScansResult: build.query({
      query: ({ patient_id, scan_id }) =>
        `/patients/${patient_id}/scans/${scan_id}/result`,
      providesTags: ["ScansResult"],
    }),
  }),
});

export const { useGetScansQuery, useLazyGetScansResultQuery } = scanApi;
