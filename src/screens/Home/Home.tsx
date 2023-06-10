import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppSelector } from "../../state/store";
import { useDispatch } from "react-redux";
import { setColor } from "../../state/BluetoothLowEnergy/slice";

export const Home = () => {
  const connectedDevice = useAppSelector((state) => state.ble.connectedDevice);
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state);
  console.log("state", state);

  const onButtonTapped = () => {
    dispatch(setColor("#000000"));
  };

  return (
    <View style={styles.container}>
      {connectedDevice?.id ? (
        <Text>You Are Connected</Text>
      ) : (
        <Pressable onPress={onButtonTapped}>
          <Text>You Are Not Connected</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
