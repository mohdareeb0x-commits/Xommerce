import useBrowseProducts from "@/hooks/useBrowseProducts";
import useHealth from "@/hooks/useHealth";
import { changeApiState } from "@/redux/apiHealthCheck/healthCheckSlice";
import { setCategoryMap } from "@/redux/category/categorySlice";
import { RootState } from "@/redux/store";
import { Category } from "@/types/categoryType";
import { Product } from "@/types/productsType";
import { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PaginationButton from "../buttons/PaginationButton";
import ProductCard from "../cards/ProductCard";
import ErrorMessage from "./ErrorMessage";
import LoadingSkeletonSection from "./LoadingSkeletonSection";

const BrowseProducts = ({
  limit,
  screen,
}: {
  limit: number;
  screen: string;
}) => {
  const limitReached = useRef<boolean>(false);
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

  useBrowseProducts(
    setProducts,
    setError,
    setCategories,
    setIsLoading,
    page,
    limit,
    limitReached,
    filter.category,
    filter.minPrice,
    filter.maxPrice,
    filter.appliedVersion,
    filter.applied,
    isApiUp,
    error,
  );

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
      <ErrorMessage
        message="OOPS! Looks like server is having a problem"
        handleReload={handleReload}
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message="Unable to connect to server"
        handleReload={handleReload}
      />
    );
  }
  if (isLoading) {
    return <LoadingSkeletonSection />;
  }

  if (products.length === 0) {
    return (
      <ErrorMessage
        message="No products matched the search"
        handleReload={handleReload}
      />
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
