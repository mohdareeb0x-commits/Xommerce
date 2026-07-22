import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { Pressable } from "react-native";

interface PaginationButtonProps {
  disabled: boolean;
  onPress: () => void;
  left: boolean;
}

const PaginationButton = ({
  disabled,
  onPress,
  left,
}: PaginationButtonProps) => {
  return (
    <Pressable
      className="bg-white border-blue-500 border-2 active:bg-blue-300 disabled:bg-white disabled:border-gray-300 p-5 items-center justify-center rounded-full"
      disabled={disabled}
      onPress={onPress}
    >
      <MaterialIcons
        className="ml-1"
        name={left ? "arrow-back-ios" : "arrow-forward-ios"}
        size={18}
        color={disabled ? "#d1d5db" : "#3b82f6"}
      />
    </Pressable>
  );
};

export default PaginationButton;
