import React, { useState } from "react";
import { Text, View } from "react-native";
import FilterButton from "./FilterButton";

type ButtonActiveType = "filter" | "sort" | "both" | null;

const FilterSort = () => {
  const [buttonActive, setButtonActive] = useState<ButtonActiveType>("sort");
  return (
    <View className="w-11/12 flex-row justify-between items-center">
      <View className="flex-row gap-3">
        <FilterButton name="Filter" icon="filter-outline" />
        <FilterButton name="Sort" icon="sort" />
      </View>
      <Text className="font-semibold text-sm color-gray-400">24 items</Text>
    </View>
  );
};

export default FilterSort;
