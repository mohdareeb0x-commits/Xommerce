import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import { Image, Text, View } from "react-native";
import FavouriteButton from "./FavouriteButton";

interface ProductCardProps {
  image: string;
  category: string;
  productName: string;
  price: string;
  discountedPrice?: string;
  rating: number;
  badge?: string;
}

const ProductCard = ({
  image,
  category,
  productName,
  price,
  discountedPrice,
  rating,
  badge,
}: ProductCardProps) => {
  return (
    <View className="w-44 min-h-72-96 bg-white rounded-xl">
      <Image
        source={{ uri: image }}
        className="w-full h-40 rounded-t-xl"
        resizeMode="cover"
      />
      {badge && (
        <View className="absolute z-10 py-1 px-2 rounded-lg top-2 left-2 bg-blue-500">
          <Text className="text-xs color-white">{badge}</Text>
        </View>
      )}
      <FavouriteButton />
      <View className="p-3 gap-2 min-h-32 justify-between">
        <View className="gap-2">
          <Text className="text-xs font-semibold text-slate-400">
            {category.toUpperCase()}
          </Text>
          <Text className="text-sm text-black font-semibold">
            {productName}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-end gap-2 bg">
            <Text className="text-lg text-black font-bold">{price}</Text>
            {discountedPrice && (
              <Text className="text-xs text-slate-400 font-medium line-through my-1">
                {discountedPrice}
              </Text>
            )}
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={10} color="gold" />
            <Text className="right-0 text-xs font-bold color-slate-400">
              {rating}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
