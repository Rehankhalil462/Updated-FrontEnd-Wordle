import "react-native-gesture-handler";
import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "./style/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
import { InfoScreen } from "./src/screens/InfoScreen";
// import { SettingsScreen } from "./src/screens/SettingsScreen";
import { ScoreScreen } from "./src/screens/ScoreScreen";
import { GameCompleteScoreScreen } from "./src/screens/GameCompleteScoreScreen";
import { SplashScreen } from "./src/screens/SplashScreen";
import { GameScreen } from "./src/screens/GameScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
export default function App() {
  const [lightThemeMode, setLightThemeMode] = useState(true);

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
            {/* <Stack.Screen name="SETTINGS" component={SettingsScreen} /> */}
            <Stack.Screen name="INFO" component={InfoScreen} />
            <Stack.Screen name="SCORE" component={ScoreScreen} />
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
