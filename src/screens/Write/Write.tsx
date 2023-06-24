import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { sendColorData } from "../../state/BluetoothLowEnergy/listener";
import { useAppDispatch } from "../../state/store";

export const Write = () => {
  const dispatch = useAppDispatch();

  const sendData = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    dispatch(sendColorData(randomColor));
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={sendData}>
        <Text style={styles.ctaBtnTxt}>Send Random Color To Server</Text>
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
