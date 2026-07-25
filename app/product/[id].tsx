import ProductDetailSkeleton from "@/components/animations/ProductDetailSkeleton";
import ProductDetailHeader from "@/components/headers/ProductDetailHeader";
import ErrorMessage from "@/components/sections/ErrorMessage";
import useGetProductById from "@/hooks/useGetProductById";
import { Category } from "@/types/categoryType";
import { Product } from "@/types/productsType";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { width } = useWindowDimensions();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadCount, setReloadCount] = useState(0);

  const specification = useMemo(() => product?.specifications ?? [], [product]);
  const hasMultipleImages = (product?.images?.length ?? 0) > 1;

  const progress = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const handleReload = () => {
    setReloadCount((prev) => prev + 1);
    setIsLoading(true);
  };

  useGetProductById(setProduct, setIsLoading, setCategories, id, reloadCount);

  const categoryMap = useMemo(() => {
    return Object.fromEntries(
      categories.map((category) => [category.id, category.name]),
    );
  }, [categories]);

  if (isLoading) {
    return (
      <SafeAreaView>
        <ProductDetailHeader />
        <ProductDetailSkeleton />
      </SafeAreaView>
    );
  }

  if (product === null) {
    return (
      <SafeAreaView className="h-full justify-center">
        <ProductDetailHeader />
        <ErrorMessage
          message="Unable to fetch product"
          handleReload={handleReload}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ProductDetailHeader />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-14">
          <Carousel
            width={width}
            height={width}
            data={product?.images || []}
            loop={hasMultipleImages}
            autoPlay={hasMultipleImages}
            onProgressChange={progress}
            autoPlayInterval={3000}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.url }}
                className="w-full h-full"
                contentFit="cover"
                cachePolicy="memory-disk"
                transition={200}
              />
            )}
          />

          {hasMultipleImages && (
            <View className="bg-white rounded-xl w-16 self-center p-1 absolute z-30 bottom-2 border border-borderGray">
              <Pagination.Basic
                progress={progress}
                data={product?.images ?? []}
                dotStyle={{
                  backgroundColor: "#D1D5DB",
                  width: 8,
                  marginHorizontal: 2,
                  height: 8,
                  borderRadius: 4,
                }}
                activeDotStyle={{
                  backgroundColor: "#2563eb",
                }}
              />
            </View>
          )}
        </View>
        <View className="p-5 bg-white mt-2 gap-2">
          <Text className="color-gray-400 font-gilroyBold">
            {categoryMap[product?.category] ?? "UnknownCategory"}
          </Text>
          <Text className="text-xl font-gilroyBold">{product?.name}</Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={14} color="gold" />
            <Text className="right-0 text-md font-jostSemiBold color-black">
              {product?.rating}
            </Text>
          </View>
          <View className="flex-row gap-4 items-end">
            <Text className="text-3xl -mb-1 font-gilroyBold">
              ${Math.floor(product?.discountedPrice || 0)}
            </Text>
            {product && product.discount > 0 ? (
              <>
                <Text className="text-lg font-gilroyBold line-through color-gray-400">
                  ${Math.floor(product?.price || 0)}
                </Text>
                <Text className="text-sm mb-1 font-gilroySemiBold color-green-500">
                  Save {Math.floor(product?.discount || 0)}%
                </Text>
              </>
            ) : null}
          </View>
          <View className="mt-4">
            <Text className="font-gilroyMedium text-md text-lg">
              {product?.description}
            </Text>
          </View>
        </View>

        <View className="p-5 bg-white mt-2 gap-3">
          {specification.map((item) => (
            <View
              key={`${item.key}-${item.value}`}
              className="flex-row justify-between"
            >
              <Text className="font-gilroyBold w-30">{item.key}</Text>
              <Text className="font-gilroyMedium w-52">{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={{ paddingBottom: insets.bottom + 20 }}
        className="absolute z-5 bottom-0 justify-between items-center p-5 border-t border-borderGray bg-white w-full flex-row"
      >
        <View>
          <Text className="font-gilroySemiBold text-sm">Total</Text>
          <Text className="font-gilroySemiBold text-xl">
            ${Math.floor(product?.discountedPrice || 0)}
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Pressable className="border-2 border-primary w-36 items-center px-5 py-3 rounded-full">
            <Text className="color-primary font-jostBold">Add to Cart</Text>
          </Pressable>
          <Pressable className="border border-primary w-36 items-center bg-primary px-5 py-3 rounded-full">
            <Text className="color-white font-jostBold">Buy Now</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
