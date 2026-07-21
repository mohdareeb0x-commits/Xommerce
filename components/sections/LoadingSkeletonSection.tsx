import { View } from "react-native";
import LoadingSkeleton from "../animations/LoadingSkeleton";

const LoadingSkeletonSection = () => {
  return (
    <View className="flex-row flex-wrap justify-between w-11/12 gap-5">
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </View>
  );
};

export default LoadingSkeletonSection;
