import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scanId: "",
};

const scanIdSlice = createSlice({
    name: "scanId",
    initialState,
    reducers: {
        setScanId: (state, action) => {
            state.scanId = action.payload;
        },
    },
});

export const { setScanId } = scanIdSlice.actions;
export default scanIdSlice.reducer;
