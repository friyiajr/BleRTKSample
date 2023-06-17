import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Device } from "react-native-ble-plx";
import { DeviceReference } from "./BluetoothLeManager";

interface BluetoothState {
  allDevices: DeviceReference[];
  currentColor: string;
  connectedDevice: DeviceReference | null;
  retrievedColor?: string | null;
}

const initialState: BluetoothState = {
  allDevices: [],
  currentColor: "#FFFFFF",
  connectedDevice: null,
  retrievedColor: undefined,
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
    setRetrievedColor: (
      state,
      action: PayloadAction<string | undefined | null>
    ) => {
      state.retrievedColor = action.payload;
    },
  },
});

export const { setDevices, setColor, setConnectedDevice, setRetrievedColor } =
  bleSlice.actions;

export default bleSlice.reducer;
