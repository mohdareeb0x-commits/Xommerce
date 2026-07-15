import React from "react";
import { View } from "react-native";
import ProductCard from "./ProductCard";

const BrowseProducts = () => {
  return (
    <View className="flex-row flex-wrap justify-between w-11/12 gap-5">
      <ProductCard
        image="https://www.imagineonline.store/cdn/shop/files/MacBook_Pro_14_in_M3_Pro_Max_Space_Black_PDP_Image_Position-1__en-IN.jpg?v=1698726378&width=823"
        category="Apple"
        productName="MacBook Pro 14 inch M3 Pro"
        price="$1,699"
        discountedPrice="$1,999"
        rating={4.9}
        badge="-15%"
      />
      <ProductCard
        image="https://santferinnovation.com/storage/products/March2026/ChG401Zgd4ZreMJk9bPn.png"
        category="Dell"
        productName="XPS 15 OLED Intel i7"
        price="$1,299"
        rating={4.6}
      />
      <ProductCard
        image="https://p2-ofp.static.pub/ShareResource/optimized/pdp/thinkpad/thinkpad-x1-series/len101t0114/thinkpad-x1-carbon-gen-13-aura-edition-14-intel-arl.png?width=584&height=584"
        category="Lenovo"
        productName="ThinkPad X1 Carbon Gen 13"
        price="$1,449"
        rating={4.7}
        badge="New"
      />
      <ProductCard
        image="https://m.media-amazon.com/images/I/71OkP3ps6HL._SX679_.jpg"
        category="Asus"
        productName="ROG Zephyrus G14 RTX 4060"
        price="$1,599"
        rating={4.8}
      />
      <ProductCard
        image="https://m.media-amazon.com/images/I/71Kwi8zU+DL.jpg"
        category="HP"
        productName="Spectre x360 14 inch 2-in-1"
        price="$1,079"
        discountedPrice="$1,199"
        rating={4.5}
        badge="-15%"
      />
      <ProductCard
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7dCu6vyOXD_bDu5QwfizryYd9spSCAd-Z0nziq2puVj2Fjrl7gObRQ96L&s=10"
        category="Microsoft"
        productName="Surface Laptop 5 13.5 inch"
        price="$999"
        rating={4.4}
      />
    </View>
  );
};

export default BrowseProducts;
