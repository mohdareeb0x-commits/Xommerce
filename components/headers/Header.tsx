import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import HeaderIcon from "./HeaderIcon";

type GreetingsType = "morning" | "afternoon" | "evening" | "night";

const Header = () => {
  const [greetings, setGreetings] = useState<GreetingsType>("morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreetings("morning");
    if (hour < 17) setGreetings("afternoon");
    if (hour < 21) setGreetings("evening");
    if (hour >= 21) setGreetings("night");
  }, []);

  return (
    <View className="flex flex-row items-center absolute w-full top-10 justify-between py-3 px-6 bg-white shadow shadow-slate-500 z-50">
      <View>
        <Text className="font-gilroyBold text-xs">Good {greetings},</Text>
        <View className="flex flex-row items-center ">
          <Text className="text-3xl color-black font-bebas">X</Text>
          <Text className="text-3xl color-blue-600 font-bebas">ommerce</Text>
        </View>
      </View>
      <View className="flex flex-row items-center w-20 justify-between">
        <HeaderIcon name="search-outline" size={22} color="#111827" />
        <HeaderIcon name="bag-outline" size={22} color="#111827" badge={true} />
      </View>
    </View>
  );
};

export default Header;
