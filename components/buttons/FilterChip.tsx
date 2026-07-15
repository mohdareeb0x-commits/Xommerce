import Entypo from "@expo/vector-icons/build/Entypo";
import React from "react";
import { Text, View } from "react-native";

interface FilterChipProps {
  label: string;
}

const FilterChip = ({ label }: FilterChipProps) => {
  return (
    <View className="bg-black px-3 py-2 rounded-full flex-row items-center">
      <Text className="color-white text-sm font-semibold">{label}</Text>
      <Entypo name="cross" size={17} color="white" className="ml-1" />
    </View>
  );
};

export default FilterChip;
