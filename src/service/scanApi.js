import { createAPI } from "../redux/createAPI";

const scanApi = createAPI.injectEndpoints({
    endpoints: (build) => ({
        getScans: build.query({
            query: (id) => `patients/${id}/scans`,
        }),
        getScansResult: build.query({
            query: ({ patient_id, scan_id }) => `/patients/${patient_id}/scans/${scan_id}/result`,
        }),
    }),
});

export const {
    useGetScansQuery,
    useLazyGetScansResultQuery,
} = scanApi;



