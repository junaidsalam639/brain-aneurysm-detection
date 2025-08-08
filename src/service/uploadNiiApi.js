import { createAPI } from "../redux/createAPI";

const uploadNiiApi = createAPI.injectEndpoints({
    endpoints: (build) => ({
        uploadNii: build.mutation({
            query: ({ formData, patient_id }) => {
                return {
                    url: `patients/${patient_id}/upload_scan`,
                    method: "POST",
                    body: formData,
                }
            },
        }),
    }),
});

export const {
    useUploadNiiMutation
} = uploadNiiApi;





