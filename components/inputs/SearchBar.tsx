import { TextInput, View } from "react-native";
import HeaderIcon from "../headers/HeaderIcon";

interface SearchBarProps {
  placeHolder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeHolder, onPress, onChangeText }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-inputGray border border-borderGray rounded-full py-1 w-11/12 px-3">
      <HeaderIcon name="search" size={18} color="#888888" />
      <TextInput
        onPress={onPress}
        placeholder={placeHolder}
        value=""
        onChangeText={onChangeText}
        placeholderTextColor="#888888"
        className="flex-1 ml-2 text-white font-gilroySemiBold"
      />
    </View>
  );
};

export default SearchBar;
