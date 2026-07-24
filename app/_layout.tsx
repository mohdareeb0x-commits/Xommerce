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
import { Provider } from "react-redux";
import "../lib/cssInterop";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  console.log(require("../assets/fonts/Gilroy-Bold.ttf"));
  const [loaded, error] = useFonts({
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
    console.log("fonts loaded changed", loaded);
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);
  console.log("layout rendered");

  if (!loaded) {
    console.log("font not loaded");
    console.log("error", error);
    return null;
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
