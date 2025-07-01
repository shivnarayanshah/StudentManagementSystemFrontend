import { mainApi } from "../../api/mainApi.jsx";

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice.jsx";

const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([mainApi.middleware]),
});

export default store;
