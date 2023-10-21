"use client";

import authReducer from "./reducers/authSlice";
import courseReducer from "./reducers/courseSlice";
import folderReducer from "./reducers/folderSlice";
import homeReducer from "./reducers/homeSlice";
import tabReducer from "./reducers/tabSlice";
import flashcardReducer from "./reducers/flashcardSlice";
// import roadmapReducer from "./reducers/roadmapSlice"

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = { key: "root", storage, version: 1 };

const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  folder: folderReducer,
  home: homeReducer,
  tab: tabReducer,
  flashcard: flashcardReducer, 
  //   roadmap: roadmapReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
