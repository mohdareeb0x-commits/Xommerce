import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

const ProductDetailHeader = () => {
  return (
    <View className="flex flex-row items-center absolute w-full top-10 justify-between py-5 px-6 bg-white z-50">
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons name="arrow-back-ios" size={20} color="black" />
      </Pressable>
      <FontAwesome name="heart-o" size={18} color="#000000" />
    </View>
  );
};

export default ProductDetailHeader;
