import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "./style/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { InfoScreen } from "./src/screens/InfoScreen";
import { GameCompleteScoreScreen } from "./src/screens/GameCompleteScoreScreen";
import { SplashScreen } from "./src/screens/SplashScreen";
import { GameScreen } from "./src/screens/GameScreen";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
export default function App() {
  const [lightThemeMode, setLightThemeMode] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://wordle-vycv.onrender.com/words/"
      );
      const words = response.data;
      await AsyncStorage.setItem("words", JSON.stringify(words));
    })();
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider theme={lightThemeMode ? lightTheme : darkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Group screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen name="SPLASH" component={SplashScreen} />
            <Stack.Screen name="HOME">
              {(props) => (
                <GameScreen
                  {...props}
                  lightThemeMode={lightThemeMode}
                  setLightThemeMode={setLightThemeMode}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="INFO" component={InfoScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          >
            <Stack.Screen
              name="SCORE_SCREEN"
              component={GameCompleteScoreScreen}
              // options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="IN_GAME_INFO_SCREEN"
              component={InfoScreen}
              // options={{ presentation: "modal" }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </PaperProvider>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
