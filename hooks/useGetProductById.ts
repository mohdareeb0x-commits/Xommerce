import { getAllCategories } from "@/service/categroyApi";
import { GetProductById } from "@/service/productApi";
import { Category } from "@/types/categoryType";
import { Product } from "@/types/productsType";
import { SetStateAction, useEffect } from "react";
import { Alert } from "react-native";

const useGetProductById = (
  setProduct: (value: SetStateAction<Product | null>) => void,
  setIsLoading: (value: SetStateAction<boolean>) => void,
  setCategories: (value: SetStateAction<Category[]>) => void,

  id: string | string[],
  reloadCount: number,
) => {
  useEffect(() => {
    async function getData() {
      try {
        const data = await GetProductById(String(id));
        setProduct(data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        Alert.alert("Unable to fetch data");
      }
    }
    getData();
  }, [id, reloadCount]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    }
    getData();
  }, [reloadCount]);
};

export default useGetProductById;
