import { createAsyncThunk, createListenerMiddleware } from "@reduxjs/toolkit";
import {
  setColor,
  setConnectedDevice,
  setDevices,
  startListeningForColors,
  startScanning,
} from "./slice";
import bluetoothLeManager, { DeviceReference } from "./BluetoothLeManager";

export const bleMiddleware = createListenerMiddleware();

export const connectToDevice = createAsyncThunk(
  "bleThunk/connectToDevice",
  async (ref: DeviceReference, thunkApi) => {
    if (ref.id) {
      await bluetoothLeManager.connectToPeripheral(ref.id);
      thunkApi.dispatch(setConnectedDevice(ref));
    }
  }
);

bleMiddleware.startListening({
  actionCreator: startScanning,
  effect: (_, listenerApi) => {
    bluetoothLeManager.scanForPeripherals((device) => {
      if (device.name === "BLESIM") {
        listenerApi.dispatch(setDevices(device));
      }
    });
  },
});

bleMiddleware.startListening({
  actionCreator: startListeningForColors,
  effect: (_, listenerApi) => {
    bluetoothLeManager.startStreamingData(({ payload }) => {
      if (typeof payload === "string") {
        listenerApi.dispatch(setColor(payload));
      }
    });
  },
});
