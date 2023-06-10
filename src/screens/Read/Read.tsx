import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Read = () => (
  <View style={styles.container}>
    <Text>Read</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
