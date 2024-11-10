import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import SplashBackgroundVideo from "../../src/Bubbles.mp4";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  IconButton,
  useTheme,
  Menu,
  Button,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

export const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { width, height } = Dimensions.get("window");
  const [visible, setVisible] = useState(false);
  const [musicMenuVisible, setMusicMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [difficultyLevel, setDifficultyLevel] = useState("Easy");
  const [music, setMusic] = useState("");
  const [sound, setSound] = useState();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const openMusicMenu = () => setMusicMenuVisible(true);
  const closeMusicMenu = () => setMusicMenuVisible(false);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/EventDeparture.mp3")
    );
    setSound(sound);
    await sound.replayAsync({ isLooping: true, volume: 0.2 });
  };

  useEffect(() => {
    (async () => {
      const isMusic = await AsyncStorage.getItem("music");
      if (isMusic) {
        setMusic(isMusic);
      }
    })();
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View
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
        onLoad={() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text
            style={{
              fontStyle: "italic",
              fontSize: 34,
              color: colors.headerLeftIcons,
              fontWeight: "bold",
            }}
          >
            SETTINGS
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: 50,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
                paddingHorizontal: 30,
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: colors.headerLeftIcons,

                  fontWeight: "bold",
                }}
              >
                Difficulty Level
              </Text>

              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Button
                    style={{
                      borderColor: "#7F00FF",
                      borderRadius: 40,
                      borderWidth: 2,
                      padding: 7,
                      backgroundColor: "white",
                    }}
                    onPress={openMenu}
                  >
                    <Text style={{ color: "#7f00ff", fontSize: 16 }}>
                      {difficultyLevel}
                    </Text>
                  </Button>
                }
                contentStyle={{ backgroundColor: "white" }}
              >
                <Menu.Item
                  onPress={async () => {
                    closeMenu();
                    setDifficultyLevel("Easy");
                    await AsyncStorage.setItem("difficultyLevel", "Easy");
                  }}
                  title="Easy"
                />
                <Divider />

                <Menu.Item
                  onPress={async () => {
                    closeMenu();
                    setDifficultyLevel("Medium");
                    await AsyncStorage.setItem("difficultyLevel", "Medium");
                  }}
                  title="Medium"
                />
                <Divider />
                <Menu.Item
                  onPress={async () => {
                    closeMenu();
                    setDifficultyLevel("Hard");
                    await AsyncStorage.setItem("difficultyLevel", "Hard");
                  }}
                  title="Hard"
                />
              </Menu>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: 30,
                paddingHorizontal: 30,
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: colors.headerLeftIcons,
                  fontWeight: "bold",
                }}
              >
                Music
              </Text>

              <Menu
                visible={musicMenuVisible}
                onDismiss={closeMusicMenu}
                anchor={
                  <Button
                    style={{
                      borderColor: "#7F00FF",
                      borderRadius: 40,
                      borderWidth: 2,
                      padding: 7,
                      backgroundColor: "white",
                    }}
                    onPress={openMusicMenu}
                  >
                    <Text style={{ color: "#7f00ff", fontSize: 16 }}>
                      {music}
                    </Text>
                  </Button>
                }
                contentStyle={{ backgroundColor: "white" }}
              >
                <Menu.Item
                  onPress={async () => {
                    closeMusicMenu();
                    setMusic("ON");
                    await AsyncStorage.setItem("music", "ON");
                    playSound();
                  }}
                  title="ON"
                />
                <Divider />
                <Menu.Item
                  onPress={async () => {
                    closeMusicMenu();
                    setMusic("OFF");
                    await AsyncStorage.setItem("music", "OFF");
                    setSound(null);
                  }}
                  title="OFF"
                />
              </Menu>
            </View>
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
            <IconButton
              size={40}
              icon="keyboard-backspace"
              color="#7f00ff"
              onPress={() =>
                navigation.navigate({
                  name: "SPLASH",
                  params: { music: music },
                  merge: true,
                })
              }
            />
          </View>
        </>
      )}
    </View>
  );
};
