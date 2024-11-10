import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  Alert,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { useTheme, Button } from "react-native-paper";
import SplashBackgroundVideo from "../../src/Bubbles.mp4";
import { Video, Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/EventDeparture.mp3")
    );
    setSound(sound);
    await sound.replayAsync({ isLooping: true, volume: 0.2 });
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const closeAppAction = () => {
    Alert.alert("Hold on !", "Are you sure you want to close this game?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", closeAppAction);
    playSound();
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", closeAppAction);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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

      <Image
        source={require("../../assets/LogoWordle.png")}
        style={{ marginBottom: 80, height: 60, width: "80%" }}
        resizeMode="contain"
      />

      <Button
        icon="send-circle-outline"
        color="#fff"
        mode="contained"
        contentStyle={{
          paddingVertical: 10,
          paddingHorizontal: 40,
          width: "100%",
        }}
        labelStyle={{
          fontSize: 24,
          color: colors.splashScreenButtonTextColor,
          fontWeight: "bold",
        }}
        onPress={() => navigation.navigate("HOME")}
        style={{
          opacity: 0.9,

          borderRadius: 36,
          shadowColor: "#b026ff",
          marginBottom: 30,
          shadowOffset: { width: 40, height: 40 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 40,
          width: "80%",
        }}
      >
        Start Game
      </Button>
      {/* <Button
        icon="cog-outline"
        color="#fff"
        mode="contained"
        contentStyle={{
          paddingVertical: 10,
          paddingHorizontal: 40,
        }}
        labelStyle={{
          fontSize: 24,
          color: colors.splashScreenButtonTextColor,
          fontWeight: "bold",
        }}
        onPress={() => navigation.navigate("SETTINGS")}
        style={{
          opacity: 0.9,

          borderRadius: 36,
          shadowColor: "#b026ff",
          marginBottom: 30,
          shadowOffset: { width: 40, height: 40 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 40,
          width: "80%",
        }}
      >
        Settings
      </Button> */}
      <Button
        icon="information-outline"
        color="#fff"
        mode="contained"
        contentStyle={{
          paddingVertical: 10,
          paddingHorizontal: 40,
        }}
        labelStyle={{
          fontSize: 24,
          color: colors.splashScreenButtonTextColor,
          fontWeight: "bold",
        }}
        onPress={() =>
          navigation.navigate("INFO", { previousScreen: "SPLASH" })
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
        Game Rules
      </Button>
    </SafeAreaView>
  );
};
