import { Category } from "@/app/createProductScreen";
import {
  setCategory,
  setMaxPrice,
  setMinPrice,
} from "@/redux/filter/filterSlice";
import { RootState } from "@/redux/store";
import { getAllCategories } from "@/service/categroyApi";
import { Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FilterButton from "../buttons/FilterButton";

type ButtonActiveType = "filter" | "sort" | "both" | null;

const FilterSort = () => {
  const [catErr, setCatErr] = useState(false);
  const [isfilterActive, setFilterActive] = useState<boolean>(false);

  const maxPrice = useSelector((state: RootState) => state.filter.maxPrice);
  const minPrice = useSelector((state: RootState) => state.filter.minPrice);
  const filterCategory = useSelector(
    (state: RootState) => state.filter.category,
  );

  const dispatch = useDispatch();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();
        if (result === "Can't Fetch") {
          throw new Error("Unable to fetch cat");
        }
        setCategories(result);
        console.log("CATEGORIES", categories);
      } catch (err) {
        console.log("GET ALL CaT ERR", err);
        setCategories([]);
        setCatErr(true);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View className="w-full px-5 flex-row justify-between items-center">
      <View className="flex-row gap-3">
        <FilterButton
          name="Filter"
          icon="filter-outline"
          value={isfilterActive}
          setValue={setFilterActive}
        />
        {/* <FilterButton name="Sort" icon="sort" /> */}
      </View>
      <Text className="font-jostSemiBold text-sm color-gray-400">24 items</Text>

      <View
        className={
          isfilterActive
            ? "bg-white gap-2 absolute border border-borderGray z-50 left-5 top-14 w-full p-4 rounded-3xl"
            : "hidden"
        }
      >
        <View className="flex-row w-full justify-between">
          <Text className="font-jostSemiBold">Add Filter</Text>
          <Pressable onPress={() => setFilterActive(false)}>
            <Entypo name="cross" size={17} color="black" className="ml-1" />
          </Pressable>
        </View>
        <View className="w-full h-[1px] bg-borderGray"></View>
        <View className="flex-row w-full items-center justify-between">
          <Text className="font-jostMedium">Price</Text>
          <View className="flex-row gap-5 items-center">
            <TextInput
              keyboardType="numeric"
              className="border min-w-18 border-borderGray rounded-xl px-5 py-1 text-lg font-jostMedium"
              value={String(minPrice)}
              onChangeText={(price) => dispatch(setMinPrice(price))}
              placeholder="Min"
            />
            <Text className="font-jostMedium">to</Text>
            <TextInput
              keyboardType="numeric"
              className="border min-w-20 items-center border-borderGray rounded-xl px-5 py-1 text-lg font-jostMedium"
              value={String(maxPrice)}
              onChangeText={(price) => dispatch(setMaxPrice(price))}
              placeholder="Max"
            />
          </View>
        </View>
        <View className="flex-row w-full items-center justify-between">
          <Text className="font-jostMedium">Category</Text>
          <View className="w-52 border text-sm border-borderGray rounded-2xl">
            <Picker
              selectedValue={filterCategory}
              onValueChange={(value) => dispatch(setCategory(value))}
            >
              <Picker.Item
                style={{ fontSize: 14 }}
                label="Select Category"
                value=""
              />
              {catErr === false &&
                categories.map((category) => (
                  <Picker.Item
                    style={{ fontSize: 14 }}
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                ))}
            </Picker>
          </View>
        </View>
      </View>
      {/* )} */}
    </View>
  );
};

export default FilterSort;
