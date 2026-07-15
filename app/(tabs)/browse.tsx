import CategoryHeader from "@/components/headers/CategoryHeader";
import BrowseProducts from "@/components/sections/BrowseProducts";
import FilterChipSection from "@/components/sections/FilterChipSection";
import FilterSort from "@/components/sections/FilterSort";
import { store } from "@/redux/store";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../global.css";

const Browse = () => {
  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1 mb-5"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <CategoryHeader />
          <View className="w-auto top-24 items-center gap-5">
            <FilterSort />
            <FilterChipSection />
            <BrowseProducts />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default Browse;
