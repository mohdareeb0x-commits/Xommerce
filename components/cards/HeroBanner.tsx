import { Image, Pressable, Text, View } from "react-native";

const HeroBanner = () => {
  return (
    <View className="w-11/12 flex h-52 rounded-3xl">
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0uLXlBlvZUzVYYYFBsHgZN5wR1FUmFLwhajxF7BylUo6fOfxvuyLKubg&s=10",
        }}
        className="w-full h-full rounded-3xl"
        resizeMode="cover"
      />
      <View className="w-full h-full rounded-3xl absolute bg-blue-900 opacity-45 "></View>
      <View className="absolute w-60 h-full flex justify-around pl-5 py-3">
        <Text className="text-white text-xs font-jostSemiBold">
          NEW ARRIVALS
        </Text>
        <Text className="text-white text-3xl font-jostBold">
          Premium Tech Up to 40% Off
        </Text>
        <Text className="text-slate-100 text-xs font-jostMedium">
          Headphones, laptops & more
        </Text>
        <Pressable className="bg-blue-500 w-28 flex items-center justify-center py-3 rounded-lg">
          <Text className="text-white font-jostSemiBold">Shop Now</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HeroBanner;
