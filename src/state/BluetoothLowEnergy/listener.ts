import { createAsyncThunk, createListenerMiddleware } from "@reduxjs/toolkit";
import {
  setConnectedDevice,
  setDevice,
  setRetrievedColor,
  startListening,
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
      bluetoothLeManager.stopScanningForPeripherals();
    }
  }
);

export const readColorFromDevice = createAsyncThunk(
  "bleThunk/readColorFromDevice",
  async (_, thunkApi) => {
    const color = await bluetoothLeManager.readColor();
    thunkApi.dispatch(setRetrievedColor(color));
  }
);

export const sendColorData = createAsyncThunk(
  "bleThunk/sendColorData",
  async (color: string, _) => {
    await bluetoothLeManager.sendColor(color);
  }
);

bleMiddleware.startListening({
  actionCreator: startScanning,
  effect: (_, listenerApi) => {
    bluetoothLeManager.scanForPeripherals((device) => {
      if (device.name === "BLESIM") {
        listenerApi.dispatch(setDevice(device));
      }
    });
  },
});

bleMiddleware.startListening({
  actionCreator: startListening,
  effect: (_, listenerApi) => {
    bluetoothLeManager.startStreamingData(({ payload }) => {
      if (typeof payload === "string") {
        listenerApi.dispatch(setRetrievedColor(payload));
      }
    });
  },
});
