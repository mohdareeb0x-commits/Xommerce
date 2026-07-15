import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useState } from "react";
import { FlatList } from "react-native";
import CategoryChip from "./CategoryChip";

type ChipCategory =
  "All" | "Laptops" | "Phones" | "Audio" | "Cameras" | "Smart Home";

const ChipScrollView = () => {
  const DATA: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  }[] = [
    {
      label: "All",
      icon: "grid-outline",
      onPress: () => setChipCategory("All"),
    },
    {
      label: "Laptops",
      icon: "laptop-outline",
      onPress: () => setChipCategory("Laptops"),
    },
    {
      label: "Phones",
      icon: "phone-portrait-outline",
      onPress: () => setChipCategory("Phones"),
    },
    {
      label: "Audio",
      icon: "musical-notes-outline",
      onPress: () => setChipCategory("Audio"),
    },
    {
      label: "Cameras",
      icon: "camera-outline",
      onPress: () => setChipCategory("Cameras"),
    },
    {
      label: "Smart Home",
      icon: "hardware-chip-outline",
      onPress: () => setChipCategory("Smart Home"),
    },
  ];

  const [chipCategory, setChipCategory] = useState<ChipCategory>("All");
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
