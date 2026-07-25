import { getAllCategories } from "@/service/categroyApi";
import { GetProducts } from "@/service/productApi";
import { Category } from "@/types/categoryType";
import { Product } from "@/types/productsType";
import React, { useEffect } from "react";

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

const useBrowseProducts = (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  setError: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  setIsLoading: (value: React.SetStateAction<boolean>) => void,
  page: number,
  limit: number,
  limitReached: React.RefObject<boolean>,
  category: string,
  minPrice: string,
  maxPrice: string,
  appliedVersion: number,
  applied: boolean,
  isApiUp: boolean | null,
  error: boolean | undefined,
) => {
  useEffect(() => {
    async function getData() {
      await GetCat(setCategories, setError);
    }
    getData();
  }, [isApiUp, error]);

  useEffect(() => {
    async function getData() {
      setError(false);
      setIsLoading(true);

      await GetData(
        setProducts,
        page,
        limit,
        limitReached,
        category,
        minPrice,
        maxPrice,
        setError,
      );
      setIsLoading(false);
    }
    limitReached.current = false;
    getData();
  }, [page, isApiUp, appliedVersion, applied]);
};

export default useBrowseProducts;
