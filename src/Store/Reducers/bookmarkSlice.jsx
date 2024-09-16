import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState: {
        bookmarkedMovies: {},
        dataMain: []
    },
    reducers: {
        toggle(state, action) {
            const movieId = action.payload;
            if (state.bookmarkedMovies[movieId]) {
                delete state.bookmarkedMovies[movieId];
            } else {
                state.bookmarkedMovies[movieId] = true;
            }
        },
        adddataMain(state,action){
          state.dataMain.push(action.payload)
        },
        removedataMain(state,action){
            const movieId = action.payload;
            state.dataMain =   state.dataMain.filter((item) => item.id !== action.payload)
            delete state.bookmarkedMovies[movieId];
        
        }
    },
});

export const { toggle,adddataMain,removedataMain } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
