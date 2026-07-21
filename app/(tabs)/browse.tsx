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
  );
};

export default Browse;
