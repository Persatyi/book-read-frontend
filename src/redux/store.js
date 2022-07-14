import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { booksReducer } from "./books";
import { sessionReducer } from "./auth";

const authConfig = {
  key: "bookReader/token",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(authConfig, sessionReducer);

const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
  devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

export { store, persistor };