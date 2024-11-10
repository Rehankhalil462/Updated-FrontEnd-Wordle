import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useTheme } from "react-native-paper";
// import Db from "../../db.json";
import { Wordle } from "../components/Wordle";

import { Header } from "../components/Header";
import { Keyboard } from "../components/Keyboard";

// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameCompleteScoreScreen } from "./GameCompleteScoreScreen";
// import { View, Text } from "react-native";
const Stack = createNativeStackNavigator();

export const HomeScreen = ({
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
  const { colors } = useTheme();

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

    if (!gameComplete) {
      setActiveWord(words[Math.floor(Math.random() * words.length)]);
      setGuesses(["", "", "", "", "", ""]);
      setGuessIndex(0);
    }
    setSolution(word);
  }, [setSolution, setGameComplete]);

  const handleKeyPress = (letter) => {
    const guess = guesses[guessIndex];

    if (letter === "ENTER") {
      if (guess.length === 0) {
        alert("please enter something !");
        return;
      }
      if (guess.length !== 5) {
        alert("Word is short ! ");
        return;
      }

      if (!words.includes(guess)) {
        alert("Not a valid word !");
        return;
      }

      if (activeWord === guess) {
        setGuessIndex(guessIndex + 1);
        setGameComplete(true);
        alert("you won @");
        return;
      }
      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1);
      } else {
        setGameComplete(true);
        alert("you lose xd");
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
      <Header navigation={navigation} />
      {solution && (
        <View
          style={[
            styles.bubblesContainer,
            { backgroundColor: colors.bubblesContainer, width: "100%" },
          ]}
        >
          <Wordle
            activeWord={activeWord}
            guessIndex={guessIndex}
            solution={solution}
            guesses={guesses}
          />
        </View>
      )}

      {gameComplete && (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Text>
            <Text>Correct Word:</Text> {activeWord}
          </Text>
          <View>
            <Button
              title="Reset"
              onPress={() => {
                setGameComplete(false);
              }}
            />
          </View>
        </View>
      )}

      <View
        style={[
          styles.keypadContainer,
          { backgroundColor: colors.keyboardContainer, width: "100%" },
        ]}
      >
        <Keyboard onKeyPress={handleKeyPress} />
      </View>
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
