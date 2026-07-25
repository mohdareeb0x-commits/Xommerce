import HeroBanner from "@/components/cards/HeroBanner";
import PromoBanner from "@/components/cards/PromoBanner";
import Header from "@/components/headers/Header";
import SearchBar from "@/components/inputs/SearchBar";
import ChipScrollView from "@/components/sections/ChipScrollView";
import FeatureProductsSection from "@/components/sections/FeatureProductsSection";
import { store } from "@/redux/store";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../global.css";

export default function Index() {
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
            <Pressable onPress={() => router.push("/createProductScreen")}>
              <Text>Create Product</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}
