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
      className="bg-white border-primary border-2 active:bg-tertiary disabled:bg-white disabled:border-borderGray p-5 items-center justify-center rounded-full"
      disabled={disabled}
      onPress={onPress}
    >
      <MaterialIcons
        className="ml-1"
        name={left ? "arrow-back-ios" : "arrow-forward-ios"}
        size={18}
        color={disabled ? "#e8e8e8" : "#2563eb"}
      />
    </Pressable>
  );
};

export default PaginationButton;
