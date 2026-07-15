import ChipScrollView from "@/components/ChipScrollView";
import FeatureProductsSection from "@/components/FeatureProductsSection";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import PromoBanner from "@/components/PromoBanner";
import SearchBar from "@/components/SearchBar";
import { store } from "@/redux/store";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../global.css";

export default function Index() {
  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1">
        <Header />
        <ScrollView
          className="flex-1 mb-5"
          contentContainerStyle={{ paddingTop: 80, paddingBottom: 20 }}
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}
