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

import { useTheme } from "react-native-paper";
import Db from "../../db.json";
import { Wordle } from "../components/Wordle";

import { Header } from "../components/Header";
import { Keyboard } from "../components/Keyboard";

// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameCompleteScoreScreen } from "../screens/GameCompleteScoreScreen";
// import { View, Text } from "react-native";
const Stack = createNativeStackNavigator();

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

  const { colors } = useTheme();
  const { height, width } = Dimensions.get("window");

  const [solution, setSolution] = useState(null);
  const [guess, setGuess] = useState("");
  const [guessIndex, setGuessIndex] = useState(0);
  const [activeWord, setActiveWord] = useState(words[0]);

  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  const [gameComplete, setGameComplete] = useState(false);
  useEffect(() => {
    const count = Object.keys(Db.words).length;
    const indexNumber = Math.floor(Math.random() * count);
    const word = Db.words[indexNumber].word;

    console.log(word);
    if (!gameComplete) {
      setActiveWord(words[Math.floor(Math.random() * words.length)]);
      setGuesses(["", "", "", "", "", ""]);
      setGuessIndex(0);
    }
    setSolution(word);
    console.log(activeWord);
  }, [setSolution, setGameComplete]);

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
        setGameComplete(true);
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
        setGameComplete(true);
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
        style={{ width: width, height: height, position: "absolute" }}
      />
      <Header closeAppAction={closeAppAction} navigation={navigation} />
      {solution && (
        <View style={[styles.bubblesContainer, { width: "100%" }]}>
          <Wordle
            activeWord={activeWord}
            guessIndex={guessIndex}
            solution={solution}
            guesses={guesses}
          />
        </View>
      )}
      {/* {gameComplete && navigation.navigate("SCORE_SCREEN")} */}
      <View style={[styles.keypadContainer, { width: "100%" }]}>
        <Keyboard onKeyPress={handleKeyPress} />
      </View>
      <Wxar style={lightThemeMode ? "light" : "dark"} />
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
