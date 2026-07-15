import React from "react";
import { TextInput, View } from "react-native";
import HeaderIcon from "./HeaderIcon";

interface SearchBarProps {
  placeHolder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeHolder, onPress, onChangeText }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-gray-200 rounded-xl w-11/12 px-2">
      <HeaderIcon name="search-outline" size={22} color="grey" />
      <TextInput
        onPress={onPress}
        placeholder={placeHolder}
        value=""
        onChangeText={onChangeText}
        placeholderTextColor="grey"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
