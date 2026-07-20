import { ProductForm } from "@/app/createProductScreen";

interface PostQueryParams {
  page: number;
  limit: number;
}

const baseUrl = "http://10.185.89.79:8080/api/v1/product";

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

  let limitExceeded: boolean = false;

  try {
    const response = await fetch(totalProductsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    if (params.page >= result.total_pages) {
      limitExceeded = true;
    }
  } catch (error) {
    console.log("Error in api", error);
  }

  try {
    const response = await fetch(productUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    if (result === null) {
      throw new Error("Data is null");
    }
    console.log("Result:", result);
    return [result, limitExceeded];
  } catch (error) {
    console.log("Error in api", error);
    return ["Error fetching products", null];
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

  console.log(formData);
  try {
    const response = await fetch(productUrl, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    if (result === null) {
      throw new Error("Data is null");
    }
    console.log("ID:", data.id);
    return result;
  } catch (error) {
    console.log("Error in api", error);
    return ["Error fetching products", null];
  }
};

export const CreateProduct = async (data: ProductForm) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Unable to create product");
    }
  } catch (err) {
    return err;
  }
};
