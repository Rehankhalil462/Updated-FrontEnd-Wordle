import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// import * as Animatable from "react-native-animatable";
import { Audio } from "expo-av";

export const Keyboard = ({ onKeyPress }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M", "⌫"];

  const [sound, setSound] = useState();
  const playTapSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/ButtonPress.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const KeyboardRow = ({ letters, onKeyPress }) => {
    return (
      <View style={styles.keyboardRow}>
        {letters.map((letter) => (
          <TouchableOpacity
            key={Math.random()}
            onPress={() => {
              playTapSound();
              onKeyPress(letter);
            }}
          >
            <View style={styles.key}>
              <Text style={styles.keyLetter}>{letter}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.keyboard}>
      <KeyboardRow letters={row1} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row2} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row3} onKeyPress={onKeyPress} />
      <View style={styles.keyboardRow}>
        <TouchableOpacity onPress={() => onKeyPress("ENTER")}>
          <View style={styles.key}>
            <Text style={styles.keyLetter}>ENTER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: { flexDirection: "column" },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 1.5,
  },
  key: {
    backgroundColor: "#d3d6da",
    padding: 10,
    margin: 3,
    borderRadius: 5,
  },
  keyLetter: {
    fontWeight: "500",
    fontSize: 19,
  },
});
