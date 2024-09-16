import { createSlice } from "@reduxjs/toolkit"

const tvSlice = createSlice({
    name: 'tv',
    initialState: {
        data: null,
    },
    reducers: {
        addatatv(state,action) {
            state.data = action.payload;
        },
        removedatatv(state) {
            state.data = null
        }
    }
})
export const { addatatv,removedatatv} = tvSlice.actions;
export default tvSlice.reducer;