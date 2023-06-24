import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { startScanning } from "../../state/BluetoothLowEnergy/slice";
import { connectToDevice } from "../../state/BluetoothLowEnergy/listener";

export const Connect = () => {
  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const discoveredDevices = useAppSelector((state) => state.ble.allDevices);

  useEffect(() => {
    dispatch(startScanning());
  }, []);

  const onDeviceSelected = (deviceId: any) => {
    dispatch(connectToDevice(deviceId));
    nav.goBack();
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={discoveredDevices}
        renderItem={({ item }) => {
          const selectDevice = () => {
            onDeviceSelected(item);
          };

          return (
            <Pressable style={styles.deviceBtn} onPress={selectDevice}>
              <Text style={styles.deviceTxt}>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 30,
    flex: 1,
    marginHorizontal: 20,
  },
  deviceBtn: {
    backgroundColor: "purple",
    height: 70,
    justifyContent: "center",
    borderRadius: 15,
  },
  deviceTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
