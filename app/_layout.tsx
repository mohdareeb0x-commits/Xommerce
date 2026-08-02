import { store } from "@/redux/store";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import {
  Jost_400Regular,
  Jost_500Medium,
  Jost_600SemiBold,
  Jost_700Bold,
} from "@expo-google-fonts/jost";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import "../lib/cssInterop";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_700Bold,
    Jost_600SemiBold,
    BebasNeue_400Regular,
    Gilroy_Regular: require("../assets/fonts/Gilroy-Regular.ttf"),
    Gilroy_Medium: require("../assets/fonts/Gilroy-Medium.ttf"),
    Gilroy_SemiBold: require("../assets/fonts/Gilroy-SemiBold.ttf"),
    Gilroy_Bold: require("../assets/fonts/Gilroy-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
