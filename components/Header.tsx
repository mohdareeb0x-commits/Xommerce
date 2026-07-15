import React from "react";
import { Text, View } from "react-native";
import HeaderIcon from "./HeaderIcon";

const Header = () => {
  return (
    <View className="flex flex-row items-center absolute w-full top-10 justify-between p-5 bg-white shadow shadow-slate-500 z-50">
      <View className="flex flex-row items-center ">
        <Text className="text-2xl color-black font-bold">X</Text>
        <Text className="text-2xl color-blue-600 font-bold">ommerce</Text>
      </View>
      <View className="flex flex-row items-center w-20 justify-between">
        <HeaderIcon name="search-outline" size={22} color="#111827" />
        <HeaderIcon name="bag-outline" size={22} color="#111827" badge={true} />
      </View>
    </View>
  );
};

export default Header;
