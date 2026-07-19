import { GetProducts } from "@/service/productApi";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import PaginationButton from "../buttons/PaginationButton";
import ProductCard from "../cards/ProductCard";

type product = {
  id: string;
  sku?: string;
  tag?: string;
  name: string;
  image: string;
  rating: number;
  category: string;
  description?: string;
  is_favourite: boolean;
  original_price: number;
  discounted_price: number;
};

const GetData = async (
  setProducts: React.Dispatch<React.SetStateAction<product[]>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  products: product[],
  page: number,
  limitReached: React.RefObject<boolean>,
) => {
  try {
    // GetProducts({ page: page, limit: 6 }).then(setProducts);
    const [data, limit] = await GetProducts({ page: page, limit: 10 });
    // console.log("DATA IS", data);
    if (limit) {
      limitReached.current = true;
      // return;
    }
    setProducts(data);
    // console.log("PRODUCTS ARE", products);
    console.log(page);
  } catch (error) {
    // if (error == "Page limit exceeded") {
    //   setPage(page - 1);
    // }
  }
};

const BrowseProducts = () => {
  const limitReached = useRef<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<product[]>([]);
  useEffect(() => {
    GetData(setProducts, setPage, products, page, limitReached);
    console.log("limit in useeffect", limitReached.current);
  }, [page]);

  return (
    <View className="flex-row flex-wrap justify-between w-11/12 gap-5">
      {products.map((item) =>
        item.original_price ? (
          <ProductCard
            key={item.id}
            productId={item.id}
            isFauvorite={item.is_favourite}
            image={item.image}
            category={item.category}
            productName={item.name}
            price={String(item.discounted_price)}
            discountedPrice={String(item.original_price)}
            rating={item.rating}
            badge={item.tag}
          />
        ) : (
          <ProductCard
            key={item.id}
            productId={item.id}
            image={item.image}
            category={item.category}
            productName={item.name}
            price={String(item.discounted_price)}
            isFauvorite={item.is_favourite}
            rating={item.rating}
            badge={item.tag}
          />
        ),
      )}
      {/* <ProductCard
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
      /> */}
      {/* <Pressable
        className="bg-blue-500 active:bg-blue-400 disabled:bg-gray-400 p-5"
        disabled={page === 1}
        onPress={() => {
          if (page === 1) {
            return;
          }
          limitReached.current = false;
          setPage(page - 1);
          console.log(page, limitReached.current);
        }}
      >
        <Text className="color-white">1</Text>
      </Pressable> */}
      <View className="w-full">
        <View className="flex-row gap-5 self-center">
          <PaginationButton
            disabled={page === 1}
            onPress={() => {
              if (page === 1) {
                return;
              }
              limitReached.current = false;
              setPage(page - 1);
            }}
            left={true}
          />
          <PaginationButton
            disabled={limitReached.current}
            onPress={() => {
              if (limitReached.current) {
                return;
              }
              if (!limitReached.current) {
                setPage(page + 1);
              }
            }}
            left={false}
          />
        </View>
      </View>
      {/* <Pressable
        className="bg-blue-500 active:bg-blue-400 disabled:bg-gray-500 p-5"
        disabled={limitReached.current}
        onPress={() => {
          if (limitReached.current) {
            console.log("ONPRESS", limitReached.current);
            return;
          }
          if (!limitReached.current) {
            console.log("LIIIIMIIIT", limitReached.current);
            setPage(page + 1);
          }
          console.log("LIIIIMIIIT22222", limitReached.current);

          console.log(page);
        }}
      >
        <Text>2</Text>
      </Pressable> */}
    </View>
  );
};

export default BrowseProducts;
