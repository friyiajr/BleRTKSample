import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Device } from "react-native-ble-plx";
import { DeviceReference } from "./BluetoothLeManager";

interface BluetoothState {
  allDevices: DeviceReference[];
  currentColor: string;
  connectedDevice: DeviceReference | null;
}

const initialState: BluetoothState = {
  allDevices: [],
  currentColor: "#FFFFFF",
  connectedDevice: null,
};

export type DevicesAction = PayloadAction<DeviceReference>;
export type ColorAction = PayloadAction<string>;
export type DeviceAction = PayloadAction<DeviceReference>;

const isDuplicteDevice = (
  devices: DeviceReference[],
  nextDevice: DeviceReference
) => devices.findIndex((device) => nextDevice.id === device.id) > -1;

export const startScanning = createAction("bleState/startScanning");
export const startListeningForColors = createAction(
  "bleState/startListeningForColors"
);

const bleSlice = createSlice({
  name: "bleState",
  initialState,
  reducers: {
    setDevices: (state, action: DevicesAction) => {
      if (!isDuplicteDevice(state.allDevices, action.payload)) {
        state.allDevices = [...state.allDevices, action.payload];
      }
    },
    setColor: (state, action: ColorAction) => {
      state.currentColor = action.payload;
    },
    setConnectedDevice: (state, action: PayloadAction<DeviceReference>) => {
      state.connectedDevice = action.payload;
    },
  },
});

export const { setDevices, setColor, setConnectedDevice } = bleSlice.actions;

export default bleSlice.reducer;
