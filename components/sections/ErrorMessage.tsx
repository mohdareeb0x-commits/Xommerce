import { Pressable, Text, View } from "react-native";

interface ErrorMessageProps {
  message: string;
  handleReload: () => void;
}

const ErrorMessage = ({ message, handleReload }: ErrorMessageProps) => {
  return (
    <View className="items-center self-center gap-2 w-full h-96 justify-center">
      <View className="w-4/5 items-center">
        <Text className="text-xl font-bold">{message}</Text>
      </View>
      <Pressable
        onPress={() => handleReload()}
        className="border bg-white border-blue-500 px-4 py-2 rounded-full"
      >
        <Text className="color-blue-500 font-medium">Reload</Text>
      </Pressable>
    </View>
  );
};

export default ErrorMessage;
