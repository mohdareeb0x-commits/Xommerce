import Entypo from "@expo/vector-icons/build/Entypo";
import { Pressable, Text, View } from "react-native";

interface FilterChipProps {
  label: string;
  onPress: () => void;
}

const FilterChip = ({ label, onPress }: FilterChipProps) => {
  return (
    <View className="bg-black pr-3 pl-4 py-2 rounded-full flex-row items-center">
      <Text className="color-white text-sm font-jostSemiBold">{label}</Text>
      <Pressable onPress={onPress}>
        <Entypo name="cross" size={17} color="white" className="ml-1" />
      </Pressable>
    </View>
  );
};

export default FilterChip;
