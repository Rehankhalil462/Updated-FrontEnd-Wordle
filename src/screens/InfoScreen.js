import { Video } from "expo-av";
import SplashBackgroundVideo from "../../src/Bubbles.mp4";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Alert,
  Dimensions,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";
// import Octicons from "@expo/vector-icons/Octicons";

export const InfoScreen = ({ navigation, route }) => {
  const { previousScreen } = route.params;
  const { colors } = useTheme();
  const { width, height } = Dimensions.get("window");

  const Block = ({ letter }) => {
    const blockStyle = [styles.exampleSquare];
    const textStyle = [styles.exampleLetter];
    if (letter === "C") {
      blockStyle.push({ backgroundColor: "#6aaa64", borderColor: "#6aaa64" });
      textStyle.push({ color: "#fff" });
    } else if (letter === "G") {
      blockStyle.push({ backgroundColor: "#c9b458", borderColor: "#c9b458" });
      textStyle.push({ color: "#fff" });
    } else if (letter === "W") {
      blockStyle.push({ backgroundColor: "#4C4D4D" });
      textStyle.push({ color: "white" });
    }

    return (
      <View style={blockStyle}>
        <Text style={textStyle}>{letter}</Text>
      </View>
    );
  };

  const ExampleRow = ({ example, alphabet }) => {
    const letters = example.split("");
    return (
      <View style={styles.exampleRow}>
        <Block letter={letters[0]} />
        <Block letter={letters[1]} />
        <Block letter={letters[2]} />
        <Block letter={letters[3]} />
        <Block letter={letters[4]} />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: colors.headerBackground,
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
        style={{ width: width, height: height, position: "absolute" }}
      />
      <Text
        style={{
          fontSize: 30,
          color: "white",
          marginBottom: 20,
          marginHorizontal: 5,
        }}
      >
        Guess the
        <Text
          style={{
            fontStyle: "italic",
            fontSize: 34,
            color: colors.headerLeftIcons,
            fontWeight: "bold",
          }}
        >
          {" "}
          WORDLE{" "}
        </Text>
        in six tries.
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: 20,

          width: "100%",
        }}
      >
        {/* <Octicons
          size={30}
          color={colors.headerLeftIcons}
          name="info"
          disabled
        /> */}
        <Text style={{ fontSize: 27, color: colors.headerLeftIcons }}>
          Explanation With Examples
        </Text>
      </View>

      <View
        style={{
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ExampleRow example="REACT" />
        <Text style={{ color: "white", fontSize: 16, marginTop: 10 }}>
          1 - The letter C is in the word and in the
          <Text style={{ fontWeight: "bold" }}> correct</Text> spot.
        </Text>
      </View>

      <View
        style={{
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ExampleRow example="SUGAR" />
        <Text style={{ color: "white", fontSize: 16, marginTop: 10 }}>
          2 - The letter G is in the word but in the
          <Text style={{ fontWeight: "bold" }}> wrong</Text> spot.
        </Text>
      </View>

      <View
        style={{
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ExampleRow example="SWEET" />
        <Text style={{ color: "white", fontSize: 16, marginTop: 10 }}>
          3 - The letter W is not in the word in
          <Text style={{ fontWeight: "bold" }}> any</Text> spot.
        </Text>
      </View>
      <View
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
      >
        {previousScreen === "SPLASH" ? (
          <IconButton
            size={40}
            icon="keyboard-backspace"
            // color={colors.headerLeftIcons}
            color="#7f00ff"
            onPress={() => navigation.goBack()}
          />
        ) : (
          <IconButton
            size={40}
            icon="arrow-down"
            color="#7f00ff"
            // color={colors.headerLeftIcons}
            onPress={() => navigation.goBack()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exampleRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  exampleSquare: {
    width: 50,
    height: 50,
    backgroundColor: "#EDF4EE",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
    marginVertical: 4,
    marginHorizontal: 8,
    borderColor: "grey",
  },
  exampleLetter: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#878a8c",
  },
});
