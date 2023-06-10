import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Device } from "react-native-ble-plx";

interface BluetoothState {
  allDevices: Device[];
  currentColor: string;
  connectedDevice: Device | null;
}

const initialState: BluetoothState = {
  allDevices: [],
  currentColor: "#FFFFFF",
  connectedDevice: null,
};

export type DevicesAction = PayloadAction<Device[]>;
export type ColorAction = PayloadAction<string>;
export type DeviceAction = PayloadAction<Device>;

const bleSlice = createSlice({
  name: "bleState",
  initialState,
  reducers: {
    startScanning: (state) => state,
    setDevices: (state, action: DevicesAction) => {
      state.allDevices = action.payload;
    },
    setColor: (state, action: ColorAction) => {
      state.currentColor = action.payload;
    },
    setConnectedDevice: (state, action: DeviceAction) => {
      state.connectedDevice = action.payload;
    },
  },
});

export const { setDevices, setColor, setConnectedDevice, startScanning } =
  bleSlice.actions;

export default bleSlice.reducer;
