import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Notify = () => (
  <View style={styles.container}>
    <Text>Notify</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
