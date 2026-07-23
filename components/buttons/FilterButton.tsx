import { RootState } from "@/redux/store";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

interface FilterButtonProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  name: "Filter" | "Sort";
  setValue: any;
  value: boolean;
}

const FilterButton = ({ icon, name, setValue, value }: FilterButtonProps) => {
  const filter = useSelector((state: RootState) => state.filter);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (
      filter.category === "" &&
      filter.maxPrice === "" &&
      filter.minPrice === ""
    ) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [filter]);

  return (
    <Pressable
      onPress={() => {
        setValue(!value);
      }}
    >
      <View
        className={
          isActive
            ? "bg-blue-100 flex-row rounded-lg w-20 gap-1 py-3 pr-3 px-2 justify-center items-center"
            : "bg-gray-200 flex-row rounded-lg w-20 gap-1 py-3 pr-3 px-2 justify-center items-center"
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
              ? "color-primary font-jostSemiBold"
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
