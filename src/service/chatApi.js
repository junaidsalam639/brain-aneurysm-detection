import { createAPI } from "../redux/createAPI";

const chatApi = createAPI.injectEndpoints({
    endpoints: (build) => ({
        getMessage: build.query({
            query: ({ patient_id, scan_id }) => `patients/${patient_id}/scans/${scan_id}/session`,
            providesTags: ["Chat"]
        }),
        sendMessage: build.mutation({
            query: ({ inputMessage, patient_id, scan_id }) => {
                return {
                    url: `patients/${patient_id}/scans/${scan_id}/chats/`,
                    method: "POST",
                    body: { "query": inputMessage }
                }
            },
            invalidatesTags: ["Chat"]
        }),
        deleteMessage: build.mutation({
            query: ({ patient_id, scan_id }) => {
                return {
                    url: `patients/${patient_id}/scans/${scan_id}/session`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Chat"]
        }),
    }),
});

export const {
    useGetMessageQuery,
    useSendMessageMutation,
    useDeleteMessageMutation
} = chatApi;



