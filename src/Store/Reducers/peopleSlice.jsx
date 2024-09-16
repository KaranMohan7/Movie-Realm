import { createSlice } from "@reduxjs/toolkit"

const peopleSlice = createSlice({
    name: 'people',
    initialState: {
        data: null,
    
    },
    reducers: {
        addpeople(state,action) {
            state.data = action.payload;
        },
        
        removepeople(state) {
            state.data = null
        }
    }
})
export const { addpeople,removepeople } = peopleSlice.actions;
export default peopleSlice.reducer;