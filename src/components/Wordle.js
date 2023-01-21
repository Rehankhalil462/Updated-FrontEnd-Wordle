import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const Wordle = ({ guesses, activeWord, guessIndex }) => {
  const Block = ({ index, guess, word, guessed }) => {
    const letter = guess[index];
    const wordLetter = word[index];
    const blockStyle = [styles.guessSquare];
    const textStyle = [styles.guessLetter];
    if (letter === wordLetter && guessed) {
      blockStyle.push(styles.guessCorrect, styles.flipAnimation);
      textStyle.push(styles.guessedLetter);
    } else if (word.includes(letter) && guessed) {
      blockStyle.push(styles.guessInWord, styles.flipAnimation);
      textStyle.push(styles.guessedLetter);
    } else if (!word.includes(letter) && guessed) {
      blockStyle.push(styles.guessNotInWord);
      textStyle.push({ color: "#878a8c" });
    }

    return (
      <View style={blockStyle}>
        <Text style={textStyle}>{letter}</Text>
      </View>
    );
  };

  const GuessRow = ({ guess, guessed, word }) => {
    return (
      <View style={styles.guessRow}>
        <Block index={0} word={word} guess={guess} guessed={guessed}></Block>
        <Block guess={guess} index={1} word={word} guessed={guessed}></Block>
        <Block guess={guess} index={2} word={word} guessed={guessed}></Block>
        <Block index={3} guess={guess} word={word} guessed={guessed}></Block>
        <Block index={4} guess={guess} word={word} guessed={guessed}></Block>
      </View>
    );
  };

  return (
    <View>
      <GuessRow word={activeWord} guessed={guessIndex > 0} guess={guesses[0]} />
      <GuessRow word={activeWord} guessed={guessIndex > 1} guess={guesses[1]} />
      <GuessRow word={activeWord} guessed={guessIndex > 2} guess={guesses[2]} />
      <GuessRow word={activeWord} guessed={guessIndex > 3} guess={guesses[3]} />
      <GuessRow word={activeWord} guessed={guessIndex > 4} guess={guesses[4]} />
      <GuessRow word={activeWord} guessed={guessIndex > 5} guess={guesses[5]} />
    </View>
  );
};

const styles = StyleSheet.create({
  guessRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  guessSquare: {
    width: 56,
    height: 56,
    backgroundColor: "#EDF4EE",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
    marginVertical: 4,
    marginHorizontal: 8,
    borderColor: "#7F00FF",
  },
  guessLetter: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#878a8c",
  },
  guessedLetter: {
    color: "#fff",
  },
  guessCorrect: {
    backgroundColor: "#6aaa64",
    borderColor: "#fff",
  },
  guessInWord: {
    backgroundColor: "#c9b458",
    borderColor: "#fff",
  },
  guessNotInWord: {
    borderColor: "#878a8c",
    backgroundColor: "#4C4D4D",
  },
});
