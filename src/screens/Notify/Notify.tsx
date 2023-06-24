import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export const Notify = () => {
  useEffect(() => {
    // dispatch(startListening());
  }, []);

  return (
    <View
      style={[
        styles.container,
        // { backgroundColor: backgroundColor ?? "#FFFFFF" },
      ]}
    >
      <View style={styles.colorBox}>
        <Text style={styles.colorTitleText}>Your Color</Text>
        <Text style={styles.colorHexText}>{/*backgroundColor*/}</Text>
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
  colorBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 125,
    width: 200,
    backgroundColor: "black",
    borderRadius: 20,
  },
  colorTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
  colorHexText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "300",
  },
});
