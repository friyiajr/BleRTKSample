/* eslint-disable no-bitwise */
import base64 from "react-native-base64";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

const COLOR_SERVICE = "96e4d99a-066f-444c-b67c-112345e3b1a2";
const COLOR_CHARACTARISTIC = "7c0209c0-93f0-437a-828a-a58379b230c4";

export interface DeviceReference {
  name?: string | null;
  id?: string;
}

class BluetoothLeManager {
  bleManager: BleManager;
  device: Device | null;
  isListening: boolean = false;

  constructor() {
    this.bleManager = new BleManager();
    this.device = null;
  }

  scanForPeripherals = (
    onDeviceFound: (deviceSummary: DeviceReference) => void
  ) => {
    this.bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      onDeviceFound({
        id: scannedDevice?.id,
        name: scannedDevice?.name ?? scannedDevice?.localName,
      });
      return;
    });
  };

  stopScanningForPeripherals = () => {
    this.bleManager.stopDeviceScan();
  };

  connectToPeripheral = async (identifier: string) => {
    this.device = await this.bleManager.connectToDevice(identifier);
  };

  onColorUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null,
    emitter: (bleValue: { payload: string | BleError }) => void
  ) => {
    if (error) {
      console.log(error);
      return "#FFFFFF";
    } else if (!characteristic?.value) {
      console.log("No Data was recieved");
      return "#FFFFFF";
    }

    const hexColor = base64.decode(characteristic.value);

    emitter({ payload: hexColor });
  };

  startStreamingData = async (
    emitter: (bleValue: { payload: string | BleError }) => void
  ) => {
    await this.device?.discoverAllServicesAndCharacteristics();
    if (!this.isListening) {
      this.isListening = true;
      this.device?.monitorCharacteristicForService(
        COLOR_SERVICE,
        COLOR_CHARACTARISTIC,
        (error, characteristic) =>
          this.onColorUpdate(error, characteristic, emitter)
      );
    }
  };
}

const bluetoothLeManager = new BluetoothLeManager();

export default bluetoothLeManager;
