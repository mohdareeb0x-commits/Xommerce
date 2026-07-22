import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface FilterButtonProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  name: "Filter" | "Sort";
}

const FilterButton = ({ icon, name }: FilterButtonProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <Pressable onPress={() => setIsActive(!isActive)}>
      <View
        className={
          isActive
            ? "bg-blue-100 flex-row rounded-lg w-20 gap-1 py-3 px-2 justify-center items-center"
            : "bg-gray-200 flex-row rounded-lg w-20 gap-1 py-3 px-2 justify-center items-center"
        }
      >
        <MaterialCommunityIcons
          name={icon}
          size={18}
          color={isActive ? "#3b82f6" : "black"}
        />
        <Text
          className={
            isActive
              ? "color-blue-500 font-jostSemiBold"
              : "color-black font-jostSemiBold"
          }
        >
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

export default FilterButton;
