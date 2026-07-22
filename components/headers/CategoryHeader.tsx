import { toggleSeeAll } from "@/redux/chipCattegory/chipCattegorySlice";
import type { RootState } from "@/redux/store";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderIcon from "./HeaderIcon";

const CategoryHeader = () => {
  const chipCategory = useSelector(
    (state: RootState) => state.chipCattegory.value,
  );
  const seeAll = useSelector((state: RootState) => state.chipCattegory.seeAll);
  const dispatch = useDispatch();
  return (
    <View className="flex flex-row items-center absolute w-full justify-between py-5 px-6 bg-white z-50">
      {/* <View className="flex flex-row items-center "> */}
      <Pressable
        onPress={() => {
          dispatch(toggleSeeAll(false));
          router.back();
        }}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color="black"
          // className="mr-5"
        />
      </Pressable>
      {/* </View> */}
      <Text className="text-xl color-black font-jostSemiBold">
        {seeAll ? chipCategory : "All"}
      </Text>
      {/* <View className="flex flex-row items-center justify-between"> */}
      <HeaderIcon name="search-outline" size={22} color="#111827" />
      {/* </View> */}
    </View>
  );
};

export default CategoryHeader;
