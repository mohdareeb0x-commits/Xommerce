import {
  setCategory,
  setMaxPrice,
  setMinPrice,
} from "@/redux/filter/filterSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtonOutline from "../buttons/ButtonOutline";
import FilterChip from "../buttons/FilterChip";

const FilterChipSection = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const categoryMap = useSelector(
    (state: RootState) => state.category.categoryMap,
  );
  const dispatch = useDispatch();

  const [numValue, setnumValue] = useState("");

  useEffect(() => {
    if (filter.minPrice !== "" && filter.maxPrice !== "") {
      setnumValue(`$${filter.minPrice} - $${filter.maxPrice}`);
    } else if (filter.maxPrice === "" && filter.minPrice === "") {
      setnumValue("");
    } else if (filter.maxPrice !== "" && filter.minPrice === "") {
      setnumValue(`$0 - $${filter.maxPrice}`);
    }
  });

  if (
    filter.category === "" &&
    filter.minPrice === "" &&
    filter.maxPrice === ""
  ) {
    return (
      <ScrollView className="w-auto border-y border-borderGray" horizontal>
        <View className="w-11/12 gap-2 flex-row ml-5 mr-5 py-4">
          <Text className="font-jostMedium color-gray-500">
            No filter applied
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="w-auto border-y border-borderGray" horizontal>
      <View className="w-11/12 gap-2 flex-row ml-5 mr-5 py-2">
        {filter.category !== "" ? (
          <FilterChip
            label={categoryMap[filter.category]}
            onPress={() => {
              dispatch(setCategory(""));
            }}
          />
        ) : (
          <></>
        )}
        {numValue !== "" ? (
          <FilterChip
            label={numValue}
            onPress={() => {
              dispatch(setMinPrice(""));
              dispatch(setMaxPrice(""));
            }}
          />
        ) : (
          <></>
        )}
        <ButtonOutline
          label="Clear All"
          onPress={() => {
            dispatch(setCategory(""));
            dispatch(setMaxPrice(""));
            dispatch(setMinPrice(""));
          }}
        />
      </View>
    </ScrollView>
  );
};

export default FilterChipSection;
