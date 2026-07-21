import { View } from "react-native";

const LoadingSkeleton = () => {
  return (
    <View className="w-44 h-72 bg-white rounded-xl flex animate-pulse gap-2">
      <View className="p-3 gap-2 h-40 justify-between rounded-t-xl bg-gray-300"></View>
      <View className="w-full px-2 gap-2">
        <View className="bg-gray-300 w-24 h-4 rounded-full"></View>
        <View className="bg-gray-300 w-36 h-4 rounded-full"></View>
        <View className="bg-gray-300 w-32 h-4 rounded-full"></View>
        <View className="flex-row mt-2 gap-2 items-end">
          <View className="bg-gray-300 w-14 h-5 rounded-full"></View>
          <View className="bg-gray-300 w-14 h-4 rounded-full"></View>
        </View>
      </View>
    </View>
  );
};

export default LoadingSkeleton;
