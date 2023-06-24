import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { readColorFromDevice } from "../../state/BluetoothLowEnergy/listener";

export const Read = () => {
  const dispatch = useAppDispatch();
  const backgroundColor = useAppSelector((state) => state.ble.retrievedColor);

  const readRemoteColor = () => {
    dispatch(readColorFromDevice());
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor ?? "#FFFFFF" },
      ]}
    >
      <Pressable style={styles.button} onPress={readRemoteColor}>
        <Text style={styles.ctaBtnTxt}>Read Color From Server</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "purple",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  ctaBtnTxt: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
