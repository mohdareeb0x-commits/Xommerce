import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Pressable, Text } from "react-native";

interface CategoryChipProps {
  label: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  isActive?: boolean;
}

const CattegoryChip = ({
  label,
  onPress,
  icon,
  isActive,
}: CategoryChipProps) => {
  if (isActive) {
    return (
      <Pressable
        onPress={onPress}
        className="bg-black border-black border rounded-full px-4 py-2 mr-2 w-auto flex-row items-center justify-around"
      >
        <Ionicons name={icon} size={20} color="white" />
        <Text className="color-white ml-1 font-jostMedium">{label}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      className="bg-white border-gray-200 border rounded-full px-4 py-2 mr-2 w-auto flex-row items-center justify-around"
    >
      <Ionicons name={icon} size={20} color="#6B7280" />
      <Text className="color-gray-500 ml-1 font-jostMedium">{label}</Text>
    </Pressable>
  );
};

export default CattegoryChip;
