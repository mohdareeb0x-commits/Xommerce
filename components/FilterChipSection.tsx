import React from "react";
import { ScrollView, View } from "react-native";
import ButtonOutline from "./ButtonOutline";
import FilterChip from "./FilterChip";

const FilterChipSection = () => {
  return (
    <ScrollView className="ml-8 w-full" horizontal>
      <View className="w-11/12 gap-2 flex-row">
        <FilterChip label="Laptops" />
        <FilterChip label="$500 - $2000" />
        <ButtonOutline label="Clear All" />
      </View>
    </ScrollView>
  );
};

export default FilterChipSection;
