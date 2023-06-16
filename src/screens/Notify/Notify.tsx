import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { startListeningForColors } from "../../state/BluetoothLowEnergy/slice";

export const Notify = () => {
  const dispatch = useAppDispatch();
  const backgroundColor = useAppSelector((state) => state.ble.currentColor);

  useEffect(() => {
    dispatch(startListeningForColors());
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 125,
          width: 200,
          backgroundColor: "black",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 23,
            fontWeight: "bold",
          }}
        >
          Your Color
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "300",
          }}
        >
          {backgroundColor}
        </Text>
      </View>
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
