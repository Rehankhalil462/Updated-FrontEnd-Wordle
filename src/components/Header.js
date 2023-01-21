import React from "react";
import { View, StatusBar } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

export const Header = ({ navigation, closeAppAction }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 0.07,
        marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : null,

        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 46,
          height: 46,
          backgroundColor: "#EDF4EE",

          borderRadius: 50,
          marginTop: 8,
          marginBottom: 0,
          marginHorizontal: 8,
        }}
      >
        <IconButton
          icon="keyboard-backspace"
          // onPress={() => navigation.navigate("SPLASH")}
          onPress={() => closeAppAction()}
          // color={colors.headerLeftIcons}
          size={30}
          color="#7f00ff"
          style={{
            width: null,
            height: null,
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 46,
          height: 46,
          backgroundColor: "#EDF4EE",

          borderRadius: 50,
          marginTop: 8,
          marginBottom: 0,
          marginHorizontal: 8,
        }}
      >
        <IconButton
          icon="help-circle-outline"
          // color={colors.headerLeftIcons}
          color="#7f00ff"
          style={{
            width: null,
            height: null,
          }}
          size={30}
          onPress={() =>
            navigation.navigate("IN_GAME_INFO_SCREEN", {
              previousScreen: "HOME",
            })
          }
        />
      </View>
    </View>
  );
};
