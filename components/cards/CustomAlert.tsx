import React from "react";
import { Pressable, Text, View } from "react-native";

interface CustomAlertProps {
  alertMsg: string;
  onPress: () => void;
}

const CustomAlert = ({ alertMsg, onPress }: CustomAlertProps) => {
  return (
    <View className="bg-white z-10 w-80 items-center h-90 gap-4 py-10 p-5 rounded-xl self-center absolute justify-self-center">
      <Text className="font-bold">Unable to create product</Text>
      <Pressable
        onPress={onPress}
        className="w-4/5 border border-blue-500 rounded-xl p-3 items-center"
      >
        <Text className="color-blue-500">Ok</Text>
      </Pressable>
    </View>
  );
};

export default CustomAlert;
