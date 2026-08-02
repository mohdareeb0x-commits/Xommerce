import { ProductForm } from "@/types/productFormType";
import { apiFetch } from "./api";
import { RefreshTokens } from "./refreshTokenService";
import { getAccessToken } from "./secureStoreService";

interface PostQueryParams {
  page: number;
  limit: number;
  category?: string;
  maxPrice?: string;
  minPrice?: string;
}

const baseUrl = process.env["EXPO_PUBLIC_BASE_URL"] + "/product";

export const GetProducts = async (
  params: PostQueryParams,
): Promise<[any, boolean | null]> => {
  const productUrl = new URL(baseUrl);
  productUrl.search = new URLSearchParams(
    params as unknown as Record<string, string>,
  ).toString();

  const totalProductsUrl = new URL(baseUrl + "/total");
  totalProductsUrl.search = new URLSearchParams(
    params as unknown as Record<string, string>,
  ).toString();

  try {
    const [prodResponse, totalResponse] = await Promise.all([
      apiFetch(productUrl.toString(), {
        method: "GET",
      }),
      apiFetch(totalProductsUrl.toString(), {
        method: "GET",
      }),
    ]);

    if (prodResponse.status === 401 || totalResponse.status === 401) {
      await RefreshTokens();
    }

    const prodData = await prodResponse.json();
    const totalData = await totalResponse.json();

    const limitExceeded = params.page >= totalData.total_pages;
    return [prodData, limitExceeded];
  } catch (error) {
    return [[], null];
  }
};

interface WishlistPostData {
  id: string;
  isFav: boolean;
}

export const UpdateProductWishList = async (data: WishlistPostData) => {
  const productUrl = new URL(baseUrl + "/wishlist");
  const formData = new FormData();
  formData.append("id", data.id);
  formData.append("isFav", String(data.isFav));

  try {
    const response = await fetch(productUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      body: formData,
    });
    if (response.status === 401) {
      await RefreshTokens();
    }
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    if (result === null) {
      throw new Error("Data is null");
    }
    return result;
  } catch (error) {
    return ["Error fetching products", null];
  }
};

export const CreateProduct = async (data: ProductForm) => {
  try {
    const response = await apiFetch("/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Unable to create product");
    }
  } catch (err) {
    return err;
  }
};

interface GetByIdType {
  id: string;
}

export const GetProductById = async (id: string) => {
  console.log("id is: ", id);
  const productUrl = new URL(baseUrl + "/id");
  const data: GetByIdType = {
    id: id,
  };
  productUrl.search = new URLSearchParams(
    data as unknown as Record<string, string>,
  ).toString();
  try {
    const response = await fetch(productUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      await RefreshTokens();
    }

    if (!response.ok) {
      throw new Error("Unable to get product");
    }
    const result = await response.json();
    return result;
  } catch {
    return null;
  }
};
