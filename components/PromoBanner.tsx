import React from "react";
import { Image, Text, View } from "react-native";

const PromoBanner = () => {
  return (
    <View className="flex-row w-11/12 bg-blue-50 justify-between items-center p-5 rounded-xl border border-blue-200">
      <View className="w-1/2 gap-2">
        <Text className="text-xs color-blue-500">LIMITED OFFER</Text>
        <Text className="text-xl font-bold color-black">
          Free Shipping on Orders $50+
        </Text>
        <Text className="text-xs font-medium color-gray-400">
          Use code at checkout. Valid through july 31.
        </Text>
        <View className="bg-white items-center justify-center p-2 w-32 rounded-lg border border-dashed border-blue-500">
          <Text className="color-blue-500 font-bold">SHIPFREE0</Text>
        </View>
      </View>
      <View className="h-24 w-24">
        <Image
          source={{
            uri: "https://img.magnific.com/premium-vector/free-shipping-offer-free-delivery-vector-poster-white-background-promotion-flat-illustration_185004-294.jpg?semt=ais_hybrid&w=740&q=80",
          }}
          className="w-full h-full rounded-2xl"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default PromoBanner;
