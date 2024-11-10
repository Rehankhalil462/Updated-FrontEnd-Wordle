import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Video } from "expo-av";
import SplashBackgroundVideo from "../Bubbles.mp4";

import { IconButton, useTheme, Button } from "react-native-paper";

import ConfettiCannon from "react-native-confetti-cannon";

//
//
//
export const GameCompleteScoreScreen = ({ navigation, route }) => {
  const { height, width } = Dimensions.get("window");
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Video
        source={SplashBackgroundVideo}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />

      <Text
        style={{
          fontSize: 30,
          color: colors.headerLeftIcons,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {route?.params?.result ? "Congratulations !" : "Better luck next time."}
      </Text>

      <Text
        style={{
          fontSize: 30,
          color: colors.headerLeftIcons,
          marginBottom: 20,
        }}
      >
        Correct Word is : {route.params.solution}
      </Text>
      {/* <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          backgroundColor: "#EDF4EE",
          borderRadius: 50,
          marginTop: 8,
          marginBottom: 0,
          marginHorizontal: 8,
        }}
      > */}
      <View style={{ width: "100%", alignItems: "center" }}>
        {/* <IconButton
          size={40}
          icon="keyboard-backspace"
          color="#7f00ff"
          onPress={() => navigation.navigate("SPLASH")}
        /> */}

        {/* <Button
          icon="refresh"
          color="#fff"
          mode="contained"
          contentStyle={{
            paddingVertical: 10,
            // paddingHorizontal: 40,
          }}
          labelStyle={{
            fontSize: 24,
            color: colors.splashScreenButtonTextColor,
            fontWeight: "bold",
          }}
          onPress={() =>
            navigation.navigate("HOME", { previousScreen: "SPLASH" })
          }
          style={{
            opacity: 0.9,

            marginBottom: 30,
            borderRadius: 36,
            shadowColor: "#b026ff",
            shadowOffset: { width: 40, height: 40 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 40,
            width: "80%",
          }}
        >
          <Text
            adjustsFontSizeToFit={true}
            style={{
              fontSize: 24,
              color: colors.splashScreenButtonTextColor,
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Restart The Game
          </Text>
        </Button> */}
        <Button
          icon="keyboard-backspace"
          color="#fff"
          mode="contained"
          contentStyle={{
            paddingVertical: 10,
            // paddingHorizontal: 40,
          }}
          labelStyle={{
            fontSize: 24,
            color: colors.splashScreenButtonTextColor,
            fontWeight: "bold",
          }}
          onPress={() => navigation.navigate("SPLASH")}
          style={{
            opacity: 0.9,

            marginBottom: 30,
            borderRadius: 36,
            shadowColor: "#b026ff",
            shadowOffset: { width: 40, height: 40 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 40,
            width: "80%",
          }}
        >
          <Text
            adjustsFontSizeToFit={true}
            style={{
              fontSize: 24,
              color: colors.splashScreenButtonTextColor,
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Back To Home
          </Text>
        </Button>
      </View>
    </View>
  );
};
