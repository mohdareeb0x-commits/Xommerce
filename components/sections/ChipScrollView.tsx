import { toggle } from "@/redux/chipCattegory/chipCattegorySlice";
import type { RootState } from "@/redux/store";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CategoryChip from "../buttons/CattegoryChip";

const ChipScrollView = () => {
  const chipCategory = useSelector(
    (state: RootState) => state.chipCattegory.value,
  );
  const dispatch = useDispatch();
  const DATA: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  }[] = [
    {
      label: "All",
      icon: "grid-outline",
      onPress: () => dispatch(toggle("All")),
    },
    {
      label: "Laptops",
      icon: "laptop-outline",
      onPress: () => dispatch(toggle("Laptops")),
    },
    {
      label: "Phones",
      icon: "phone-portrait-outline",
      onPress: () => dispatch(toggle("Phones")),
    },
    {
      label: "Audio",
      icon: "musical-notes-outline",
      onPress: () => dispatch(toggle("Audio")),
    },
    {
      label: "Cameras",
      icon: "camera-outline",
      onPress: () => dispatch(toggle("Cameras")),
    },
    {
      label: "Smart Home",
      icon: "hardware-chip-outline",
      onPress: () => dispatch(toggle("Smart Home")),
    },
  ];

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      data={DATA}
      renderItem={({ item }) => (
        <CategoryChip
          label={item.label}
          icon={item.icon}
          onPress={item.onPress}
          isActive={chipCategory === item.label}
        />
      )}
    />
  );
};

export default ChipScrollView;
