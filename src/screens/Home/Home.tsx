import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../state/store";

const screens = ["Notify", "Read", "Write"];

export const Home = () => {
  const nav = useNavigation<any>();

  const connectedDevice = useAppSelector((state) => state.ble.connectedDevice);

  const onButtonTapped = () => {
    nav.push("Connect");
  };

  return (
    <View style={styles.container}>
      {connectedDevice?.id ? (
        <View>
          <FlatList
            style={{ marginTop: 30 }}
            data={screens}
            renderItem={({ item }) => {
              const goToScreen = () => {
                nav.push(item);
              };
              return (
                <Pressable
                  style={styles.connectToDeviceBtn}
                  onPress={goToScreen}
                >
                  <Text style={styles.connectBtnTextColor}>{item}</Text>
                </Pressable>
              );
            }}
          />
        </View>
      ) : (
        <Pressable style={styles.connectToDeviceBtn} onPress={onButtonTapped}>
          <Text style={styles.connectBtnTextColor}>
            Please Connect To A Device
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  connectToDeviceBtn: {
    backgroundColor: "purple",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 7,
    height: 70,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  connectBtnTextColor: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
