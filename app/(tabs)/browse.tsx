import CategoryHeader from "@/components/CategoryHeader";
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
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-auto items-center gap-5">
            <CategoryHeader />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default Browse;
