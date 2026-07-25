import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const ProductDetailSkeleton = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, { duration: 800, easing: Easing.ease }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  return (
    <Animated.View style={[animatedStyle]} className="mt-14 gap-2">
      <View className="w-full h-96 bg-gray-300"></View>
      <View className="w-full bg-white p-5 gap-3">
        <View className="w-24 rounded-full h-4 bg-gray-300"></View>
        <View className="w-64 rounded-full h-6 bg-gray-300"></View>
        <View className="w-8 rounded-full h-4 bg-gray-300"></View>
        <View className="w-60 rounded-full h-6 bg-gray-300"></View>
        <View className="gap-2 mt-2">
          <View className="rounded-full h-5 bg-gray-300"></View>
          <View className="w-11/12 rounded-full h-5 bg-gray-300"></View>
          <View className="w-3/4 rounded-full h-5 bg-gray-300"></View>
          <View className="w-80 rounded-full h-5 bg-gray-300"></View>
        </View>
      </View>
      <View className="w-full bg-white p-5 gap-3">
        <View className="flex-row justify-between">
          <View className="w-44 rounded-full h-6 bg-gray-300"></View>
          <View className="w-44 rounded-full h-6 bg-gray-300"></View>
        </View>
        <View className="flex-row justify-between">
          <View className="w-44 rounded-full h-6 bg-gray-300"></View>
          <View className="w-44 rounded-full h-6 bg-gray-300"></View>
        </View>
        <View className="flex-row justify-between">
          <View className="w-44 rounded-full h-6 bg-gray-300"></View>
          <View className="w-44 rounded-full h-6 bg-gray-300"></View>
        </View>
      </View>
    </Animated.View>
  );
};

export default ProductDetailSkeleton;
