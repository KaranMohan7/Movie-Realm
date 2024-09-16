import { createSlice } from "@reduxjs/toolkit"

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        data: null,
    
    },
    reducers: {
        addata(state,action) {
            state.data = action.payload;
        },
        
        removedata(state) {
            state.data = null
        }
    }
})
export const { addata,removedata } = movieSlice.actions;
export default movieSlice.reducer;