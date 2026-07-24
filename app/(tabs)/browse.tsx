import CategoryHeader from "@/components/headers/CategoryHeader";
import BrowseProducts from "@/components/sections/BrowseProducts";
import FilterChipSection from "@/components/sections/FilterChipSection";
import FilterSort from "@/components/sections/FilterSort";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

const Browse = () => {
  return (
    <SafeAreaView className="flex-1">
      <CategoryHeader />
      <ScrollView
        className="flex-1 mb-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="top-16 pt-4 gap-4 bg-white">
          <FilterSort />
          <FilterChipSection />
        </View>
        <View className="w-auto top-20 items-center gap-5">
          <BrowseProducts limit={10} screen="browse" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Browse;
