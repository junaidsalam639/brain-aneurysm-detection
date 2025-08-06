import { createAPI } from "../redux/createAPI";

const patientsApi = createAPI.injectEndpoints({
    endpoints: (build) => ({
        getPatients: build.query({
            query: () => `patients`,
            providesTags: ["Patients"]
        }),
        addPatients: build.mutation({
            query: ({ formData }) => {
                return {
                    url: `patients`,
                    method: "POST",
                    body: formData,
                }
            },
            invalidatesTags: ["Patients"]
        }),
        updatePatients: build.mutation({
            query: ({ formData, id }) => {
                return {
                    url: `patients/${id}`,
                    method: "PUT",
                    body: formData,
                }
            },
            invalidatesTags: ["Patients"]
        }),
        deletePatients: build.mutation({
            query: (id) => {
                return {
                    url: `patients/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Patients"]
        })
    }),
});

export const {
    useGetPatientsQuery,
    useAddPatientsMutation,
    useUpdatePatientsMutation,
    useDeletePatientsMutation,
} = patientsApi;



