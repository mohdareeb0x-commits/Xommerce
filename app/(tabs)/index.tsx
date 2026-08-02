import HeroBanner from "@/components/cards/HeroBanner";
import PromoBanner from "@/components/cards/PromoBanner";
import Header from "@/components/headers/Header";
import SearchBar from "@/components/inputs/SearchBar";
import ChipScrollView from "@/components/sections/ChipScrollView";
import FeatureProductsSection from "@/components/sections/FeatureProductsSection";
import { store } from "@/redux/store";
import { refreshAccessToken } from "@/service/api";
import { GetMe } from "@/service/authService";
import { getAccessToken, getRefreshToken } from "@/service/secureStoreService";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../global.css";

export default function Index() {
  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = async () => {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    if (!accessToken || !refreshToken) {
      router.replace("/auth/logIn");
      return;
    }
    if (accessToken && refreshToken) {
      const result = await GetMe();
      if (!result) {
        await refreshAccessToken();
      }
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1 -mb-10">
        <Header />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingTop: 80, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-auto items-center gap-5">
            <SearchBar placeHolder="Search electronics..." />
            <HeroBanner />
            <View className="w-auto ml-1 h-12 flex-row items-center justify-start">
              <ChipScrollView />
            </View>
            <FeatureProductsSection />
            <PromoBanner />
            <Pressable onPress={() => router.push("/auth/register")}>
              <Text>Create Product</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}
