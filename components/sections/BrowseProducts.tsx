import useHealth from "@/hooks/useHealth";
import { changeApiState } from "@/redux/apiHealthCheck/healthCheckSlice";
import { setCategoryMap } from "@/redux/category/categorySlice";
import { RootState } from "@/redux/store";
import { getAllCategories } from "@/service/categroyApi";
import { GetProducts } from "@/service/productApi";
import { Category } from "@/types/categoryType";
import { Product } from "@/types/productsType";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PaginationButton from "../buttons/PaginationButton";
import ProductCard from "../cards/ProductCard";
import LoadingSkeletonSection from "./LoadingSkeletonSection";

const GetData = async (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  page: number,
  limit: number,
  limitReached: React.RefObject<boolean>,
  category: string,
  minPrice: string,
  maxPrice: string,
  setError: React.Dispatch<React.SetStateAction<boolean | undefined>>,
) => {
  try {
    const [data, limitReach] = await GetProducts({
      page: page,
      limit: limit,
      minPrice: minPrice,
      maxPrice: maxPrice,
      category: category,
    });
    if (!Array.isArray(data)) {
      setProducts([]);
      return;
    }
    if (limitReach) {
      limitReached.current = true;
    }
    setProducts(data);
  } catch (error) {
    setError(true);
    setProducts([]);
  }
};

const GetCat = async (
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  setError: React.Dispatch<React.SetStateAction<boolean | undefined>>,
) => {
  try {
    const data = await getAllCategories();
    if (!Array.isArray(data)) {
      console.error("Invalid categories data:", data);
      setError(true);
      setCategories([]);
      return;
    }
    setCategories(data);
  } catch (error) {
    setError(true);
    setCategories([]);
  }
};

const BrowseProducts = ({
  limit,
  screen,
}: {
  limit: number;
  screen: string;
}) => {
  const limitReached = useRef<boolean>(false);
  const [reloadCount, setReloadCount] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>();

  const filter = useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch();

  const isApiUp = useHealth();

  const handleReload = () => {
    setError(false);
    dispatch(changeApiState(true));
    setPage(1);
    setIsLoading(true);
    limitReached.current = false;
  };

  useEffect(() => {
    async function getData() {
      await GetCat(setCategories, setError);
    }
    getData();
  }, [reloadCount, isApiUp, error]);

  useEffect(() => {
    async function getData() {
      setError(false);
      setIsLoading(true);

      await GetData(
        setProducts,
        page,
        limit,
        limitReached,
        filter.category,
        filter.minPrice,
        filter.maxPrice,
        setError,
      );
      setIsLoading(false);
    }
    limitReached.current = false;
    getData();
  }, [page, isApiUp, filter.appliedVersion, filter.applied]);

  const categoryMap = useMemo(() => {
    if (isApiUp && !error) {
      return Object.fromEntries(
        categories.map((category) => [category.id, category.name]),
      );
    }
    console.log(categoryMap);
    return {};
  }, [categories, error, isApiUp]);

  useEffect(() => {
    dispatch(setCategoryMap(categoryMap));
  }, [categoryMap]);

  if (!isApiUp) {
    return (
      <View className="items-center self-center gap-2 w-full h-96 justify-center">
        <Text className="text-xl font-bold">OOPS!</Text>
        <Text className="text-xl font-bold">
          Looks like server is having a problem
        </Text>
        <Pressable
          onPress={() => handleReload()}
          className="border bg-white border-blue-500 px-4 py-2 rounded-full"
        >
          <Text className="color-blue-500 font-medium">Reload</Text>
        </Pressable>
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center self-center gap-2 w-full h-96 justify-center">
        <Text className="text-xl font-bold">Unable to connect to server</Text>
        <Pressable
          onPress={() => handleReload()}
          className="border border-blue-500 px-4 py-2 rounded-full"
        >
          <Text className="color-blue-500 font-medium">Reload</Text>
        </Pressable>
      </View>
    );
  }
  if (isLoading) {
    return <LoadingSkeletonSection />;
  }

  if (products.length === 0) {
    return (
      <View className="items-center gap-2 self-center w-full h-96 justify-center">
        <Text className="text-xl font-bold">
          No products matched the search
        </Text>
        <Pressable
          onPress={() => handleReload()}
          className="border border-blue-500 px-4 py-2 rounded-full"
        >
          <Text className="color-blue-500 font-medium">Reload</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View className="flex-row flex-wrap justify-between w-11/12 gap-5">
      {isApiUp &&
        !error &&
        products.map((item) =>
          item.discount !== 0 ? (
            <ProductCard
              key={item.id}
              productId={item.id}
              isFauvorite={item.is_favourite}
              image={
                item.images.find((img) => img.isPrimary)?.url ??
                item.images[0]?.url ??
                ""
              }
              category={categoryMap[item.category] ?? item.category}
              productName={item.name}
              price={String(Math.floor(item.price))}
              discountedPrice={String(Math.floor(item.discountedPrice))}
              rating={item.rating}
              badge={String(item.discount)}
            />
          ) : (
            <ProductCard
              key={item.id}
              productId={item.id}
              image={
                item.images.find((img) => img.isPrimary)?.url ??
                item.images[0]?.url ??
                ""
              }
              category={categoryMap[item.category] ?? item.category}
              productName={item.name}
              discountedPrice={String(Math.floor(item.discountedPrice))}
              isFauvorite={item.is_favourite}
              rating={item.rating}
            />
          ),
        )}
      {
        // Example Data: -->
        /* <ProductCard
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
      /> */
      }
      {screen === "browse" && (
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
      )}
    </View>
  );
};

export default BrowseProducts;
