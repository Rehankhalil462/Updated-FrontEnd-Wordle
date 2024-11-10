import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  BackHandler,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { StatusBar as Wxar } from "expo-status-bar";
import { Video } from "expo-av";
import SplashBackgroundVideo from "../Bubbles.mp4";

import { ActivityIndicator, useTheme } from "react-native-paper";
import { Wordle } from "../components/Wordle";

import { Header } from "../components/Header";
import { Keyboard } from "../components/Keyboard";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const GameScreen = ({
  lightThemeMode,
  setLightThemeMode,
  navigation,
}) => {
  const words = [
    "LIGHT",
    "TIGHT",
    "THGIT",
    "AIBHC",
    "WRUNG",
    "COULD",
    "PERKY",
    "MOUNT",
    "WHACK",
    "SUGAR",
  ];

  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();

  const [guessIndex, setGuessIndex] = useState(0);
  const [activeWord, setActiveWord] = useState(words[0]);

  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);

  const closeAppAction = () => {
    Alert.alert(
      "Hold on !",
      "Are you sure you want to dismiss your running game?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "destructive",
        },
        {
          text: "YES",
          onPress: () => navigation.navigate("SPLASH"),
          style: "default",
        },
      ]
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", closeAppAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", closeAppAction);
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const response = await AsyncStorage.getItem("words");

      if (response) {
        const wordsData = JSON.parse(response);
        handleSetWordAndSolution(wordsData, true);
      } else {
        handleSetWordAndSolution(words);
      }
    })();
  }, []);

  const handleSetWordAndSolution = (data, isApiData = false) => {
    if (isApiData) {
      const selectedWord =
        data[Math.floor(Math.random() * data.length)]?.word.toUpperCase();
      console.log("selectedWord", selectedWord);
      setActiveWord(selectedWord);
    } else {
      setActiveWord(data[Math.floor(Math.random() * data.length)]);
    }
    setGuesses(["", "", "", "", "", ""]);
    setGuessIndex(0);
    setLoading(false);
  };

  const handleKeyPress = (letter) => {
    const guess = guesses[guessIndex];

    if (letter === "ENTER") {
      if (guess.length === 0) {
        alert("Please complete row by letters !");
        return;
      }
      if (guess.length !== 5) {
        alert("Please complete the row .");
        return;
      }

      // if (!words.includes(guess)) {
      //   alert("Not a valid word !");
      //   return;
      // }

      if (activeWord === guess) {
        setGuessIndex(guessIndex + 1);
        // alert("you won @");
        navigation.navigate("SCORE_SCREEN", {
          result: true,
          solution: activeWord,
        });
        return;
      }
      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1);
      } else {
        navigation.navigate("SCORE_SCREEN", {
          result: false,
          solution: activeWord,
        });

        // alert("you lose xd");
        return;
      }
    }
    if (letter === "⌫") {
      setGuesses({ ...guesses, [guessIndex]: guess.slice(0, -1) });
      return;
    }

    if (guess.length >= 5) {
      return;
    }

    setGuesses({ ...guesses, [guessIndex]: guess + letter });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.headerBackground }]}
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
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Header closeAppAction={closeAppAction} navigation={navigation} />
          {activeWord && (
            <View style={[styles.bubblesContainer, { width: "100%" }]}>
              <Wordle
                activeWord={activeWord}
                guessIndex={guessIndex}
                guesses={guesses}
              />
            </View>
          )}
          {/* {gameComplete && navigation.navigate("SCORE_SCREEN")} */}
          <View style={[styles.keypadContainer, { width: "100%" }]}>
            <Keyboard onKeyPress={handleKeyPress} />
          </View>
          <Wxar style={lightThemeMode ? "light" : "dark"} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#3A4A5A",

    alignItems: "center",
    justifyContent: "center",
  },
  bubblesContainer: {
    flex: 0.63,
    alignItems: "center",
    justifyContent: "center",
  },
  keypadContainer: {
    flex: 0.3,
  },
});
