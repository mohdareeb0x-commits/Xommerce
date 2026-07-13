import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface HeaderIconProps {
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string;
  badge?: boolean;
}

const HeaderIcon = ({ name, size, color, badge = false }: HeaderIconProps) => {
  return (
    <Pressable>
      <Ionicons name={name} size={size} color={color} />
      {badge && (
        <View className="absolute -top-1 -right-1 bg-blue-500 w-4 h-4 items-center  justify-center rounded-full">
          <Text className="text-xs color-white font-bold">3</Text>
        </View>
      )}
    </Pressable>
  );
};

export default HeaderIcon;
