import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

const FavouriteButton = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  return (
    <Pressable
      className="absolute z-10 right-2 top-2"
      onPress={() => setIsFavourite(!isFavourite)}
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
