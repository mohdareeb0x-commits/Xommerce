import { UpdateProductWishList } from "@/service/productApi";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

interface FavouriteButtonProps {
  productId: string;
  isWishlist: boolean;
}

const handleOnpress = async (
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>,
  isFavourite: boolean,
  productId: string,
) => {
  const data = {
    id: productId,
    isFav: !isFavourite,
  };
  await UpdateProductWishList(data);
  setIsFavourite(!isFavourite);
};

const FavouriteButton = ({ productId, isWishlist }: FavouriteButtonProps) => {
  const [isFavourite, setIsFavourite] = useState(isWishlist);
  return (
    <Pressable
      className="absolute z-10 right-2 top-2"
      onPress={() => handleOnpress(setIsFavourite, isFavourite, productId)}
    >
      <View className="rounded-full bg-white p-2 items-center justify-center border border-gray-300">
        <FontAwesome
          name={isFavourite ? "heart" : "heart-o"}
          size={12}
          color={isFavourite ? "red" : "#d1d5db"}
        />
      </View>
    </Pressable>
  );
};

export default FavouriteButton;
