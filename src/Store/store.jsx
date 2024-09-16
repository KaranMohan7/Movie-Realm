import { configureStore, combineReducers } from "@reduxjs/toolkit";
import movie from "./Reducers/movieSlice";
import tv from "./Reducers/tvSlice";
import people from "./Reducers/peopleSlice";
import bookmark from "./Reducers/bookmarkSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";

const bookmarkPersistConfig = {
  key: "bookmark",
  storage, 
};
const rootReducer = combineReducers({
  movie,
  tv,
  people,
  bookmark: persistReducer(bookmarkPersistConfig, bookmark), 
});
const store = configureStore({
  reducer: rootReducer,
});
export const persistor = persistStore(store);
export default store;
