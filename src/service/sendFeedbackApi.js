import { createAPI } from "../redux/createAPI";

const sendFeedbackApi = createAPI.injectEndpoints({
    endpoints: (build) => ({
        sendFeeback: build.mutation({
            query: ({ formData, patient_id, scan_id }) => {
                return {
                    url: `patients/${patient_id}/scans/${scan_id}/feedback`,
                    method: "POST",
                    body: formData,
                }
            },
        }),
    }),
});

export const {
    useSendFeebackMutation
} = sendFeedbackApi;








