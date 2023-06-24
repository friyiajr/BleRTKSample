import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bleMiddleware } from "./BluetoothLowEnergy/listener";

import bleReducer from "./BluetoothLowEnergy/slice";

const appReducer = combineReducers({
  ble: bleReducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(bleMiddleware.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
