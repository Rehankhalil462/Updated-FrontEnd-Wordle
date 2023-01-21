import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";

export const ScoreScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 50 }}>Score Screen</Text>
      <IconButton
        size={40}
        icon="keyboard-backspace"
        onPress={() => navigation.navigate("HOME")}
      />
    </View>
  );
};
