import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import FavouriteButton from "../buttons/FavouriteButton";

interface ProductCardProps {
  image: string;
  productId: string;
  category: string;
  productName: string;
  price?: string;
  discountedPrice: string;
  rating: number;
  badge?: string;
  isFauvorite: boolean;
}

const handleOnPress = (productId: string) => {
  router.push({
    pathname: "/product/[id]",
    params: {
      id: productId,
    },
  });
};

const ProductCard = ({
  productId,
  image,
  category,
  productName,
  price,
  discountedPrice,
  isFauvorite,
  rating,
  badge,
}: ProductCardProps) => {
  return (
    <View className="w-44 min-h-72-96 bg-white rounded-3xl">
      <Pressable onPress={() => handleOnPress(productId)}>
        <Image
          source={{ uri: image }}
          className="w-full h-40 rounded-t-3xl"
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={200}
        />
      </Pressable>
      {badge && (
        <View className="absolute z-10 py-1 px-2 rounded-lg top-2 left-2 bg-blue-500">
          <Text className="text-xs font-gilroyMedium color-white">
            -{badge}%
          </Text>
        </View>
      )}
      <FavouriteButton productId={productId} isWishlist={isFauvorite} />
      <Pressable onPress={() => handleOnPress(productId)}>
        <View className="p-3 gap-2 min-h-32 justify-between">
          <View className="gap-2">
            <Text className="text-xs font-gilroySemiBold text-slate-400">
              {category.toUpperCase()}
            </Text>
            <Text className="text-sm text-black font-gilroySemiBold">
              {productName}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-end gap-2 bg">
              <Text className="text-lg text-black font-jostBold">
                ${discountedPrice}
              </Text>
              {price && (
                <Text className="text-xs text-slate-400 font-jostMedium line-through my-1">
                  ${price}
                </Text>
              )}
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={10} color="gold" />
              <Text className="right-0 text-xs font-jostMedium color-slate-400">
                {rating}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default ProductCard;
