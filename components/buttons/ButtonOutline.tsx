import { Pressable, Text, View } from "react-native";

interface ButtonOutlineProps {
  label: string;
  onPress?: () => {};
}

const ButtonOutline = ({ label, onPress }: ButtonOutlineProps) => {
  return (
    <Pressable onPress={onPress}>
      <View className="bg-white border border-blue-500 rounded-full items-center justify-center px-5 py-2">
        <Text className="color-blue-500 text-sm font-jostMedium">{label}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonOutline;
