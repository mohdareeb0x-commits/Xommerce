import useHealth from "@/hooks/useHealth";
import { toggle } from "@/redux/chipCattegory/chipCattegorySlice";
import { setApply, setCategory, toggleApply } from "@/redux/filter/filterSlice";
import type { RootState } from "@/redux/store";
import { getAllCategories } from "@/service/categroyApi";
import { Category } from "@/types/categoryType";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CategoryChip from "../buttons/CattegoryChip";

const GetCat = async (
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
) => {
  try {
    const data = await getAllCategories();
    if (!Array.isArray(data)) {
      console.error("Invalid categories data:", data);
      setCategories([]);
      return;
    }
    setCategories(data);
  } catch (error) {
    setCategories([]);
  }
};

const ChipScrollView = () => {
  const chipCategory = useSelector(
    (state: RootState) => state.chipCattegory.value,
  );
  const dispatch = useDispatch();

  const isApiUp = useHealth();

  const [DATA, setDATA] = useState<Category[]>([]);

  useEffect(() => {
    async function getData() {
      await GetCat(setDATA);
    }
    getData();
  }, [isApiUp]);

  const sortedDATA = [...DATA].sort((a, b) => {
    if (a.name === "All") return -1;
    if (b.name === "All") return 1;
    return 0;
  });

  // useEffect(() => {
  //   setDATA((prev) => {
  //     const all = prev.find((item) => item.name === "All");
  //     const rest = prev.filter((item) => item.name !== "All");

  //     return all ? [all, ...rest] : prev;
  //   });
  // }, []);
  // const DATA: {
  //   label: string;
  //   icon: keyof typeof Ionicons.glyphMap;
  //   onPress: () => void;
  // }[] = [
  //   {
  //     label: "All",
  //     icon: "grid-outline",
  //     onPress: () => dispatch(toggle("All")),
  //   },
  //   {
  //     label: "Laptops",
  //     icon: "laptop-outline",
  //     onPress: () => dispatch(toggle("Laptops")),
  //   },
  //   {
  //     label: "Phones",
  //     icon: "phone-portrait-outline",
  //     onPress: () => dispatch(toggle("Phones")),
  //   },
  //   {
  //     label: "Audio",
  //     icon: "musical-notes-outline",
  //     onPress: () => dispatch(toggle("Audio")),
  //   },
  //   {
  //     label: "Cameras",
  //     icon: "camera-outline",
  //     onPress: () => dispatch(toggle("Cameras")),
  //   },
  //   {
  //     label: "Smart Home",
  //     icon: "hardware-chip-outline",
  //     onPress: () => dispatch(toggle("Smart Home")),
  //   },
  // ];

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      data={sortedDATA}
      renderItem={({ item }) => (
        <CategoryChip
          label={item.name}
          icon={item.icon}
          onPress={() => {
            dispatch(toggle(item.name));
            dispatch(setCategory(item.id));
            dispatch(toggleApply());
            dispatch(setApply(true));
          }}
          isActive={chipCategory === item.name}
        />
      )}
    />
  );
};

export default ChipScrollView;
