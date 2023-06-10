import { createListenerMiddleware } from "@reduxjs/toolkit";
import { startScanning } from "./slice";

export const bleMiddleware = createListenerMiddleware();

bleMiddleware.startListening({
  actionCreator: startScanning,
  effect: (action, listenerApi) => {
    // listenerApi.dispatch(todoAdded('Buy pet food'))
  },
});
