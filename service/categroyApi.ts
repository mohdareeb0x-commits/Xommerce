import { RefreshTokens } from "./refreshTokenService";
import { getAccessToken } from "./secureStoreService";

const baseUrl = process.env["EXPO_PUBLIC_BASE_URL"] + "/category";

export const getAllCategories = async () => {
  try {
    const response = await fetch(baseUrl, {
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
      throw new Error("Can't fetch categories");
    }

    const result = await response.json();

    return result;
  } catch (err) {
    console.log("Category err", err);
    return [];
  }
};
