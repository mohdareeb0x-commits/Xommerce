import { toggleSeeAll } from "@/redux/chipCattegory/chipCattegorySlice";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import ProductCard from "../cards/ProductCard";

const FeatureProductsSection = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <View className="flex-row justify-between items-center w-11/12 mb-3">
        <Text className="text-lg font-semibold text-slate-800 mb-3">
          Featured Products
        </Text>
        <Pressable
          onPress={() => {
            dispatch(toggleSeeAll(true));
            router.push("/(tabs)/browse");
          }}
        >
          <Text className="text-sm font-semibold text-blue-600 mb-3">
            See All
          </Text>
        </Pressable>
      </View>
      <View className="flex-row flex-wrap justify-between w-11/12 gap-5">
        <ProductCard
          image="https://shopatsc.com/cdn/shop/products/2500x2500_Silver_1.jpg?v=1694415813"
          category="Audio"
          productId="6a5941ced91e53d096133923"
          isFauvorite={false}
          productName="Sony WH-1000XM5 Wireless Headphones"
          price="279"
          discountedPrice="349"
          rating={4.8}
          badge="-20%"
        />
        <ProductCard
          image="https://www.imagineonline.store/cdn/shop/files/MacBook_Pro_16_in_M3_Pro_Max_Silver_PDP_Image_Position_1__en-IN_a4871131-8e74-456d-bbf0-13d3837527f4.jpg?v=1698727196&width=1445"
          productId="6a5941ced91e53d096133923"
          isFauvorite={false}
          category="Laptops"
          productName="MacBook Pro 14 inch M3 Pro"
          price="1,999"
          rating={4.9}
        />
        <ProductCard
          image="https://image.cdn.shpy.in/301826/1-1776152854219.jpeg?width=600&format=webp"
          productId="6a5941ced91e53d096133923"
          isFauvorite={false}
          category="Phones"
          productName="iPhone 15 Pro 256GB"
          price="999"
          rating={4.7}
          badge="New"
        />
        <ProductCard
          image="https://www.apple.com/newsroom/images/2023/09/apple-unveils-apple-watch-ultra-2/article/Apple-Watch-Ultra-2-Modular-Ultra-watch-face-230912_inline.jpg.large.jpg"
          productId="6a5941ced91e53d096133923"
          isFauvorite={false}
          category="Wearables"
          productName="Apple Watch Ultra 2"
          price="799"
          rating={4.6}
        />
      </View>
    </View>
  );
};

export default FeatureProductsSection;
