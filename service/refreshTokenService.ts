import { router } from "expo-router";
import {
  deleteRefreshToken,
  deleteUserID,
  getRefreshToken,
  getUserID,
  setAccessToken,
  setRefreshToken,
} from "./secureStoreService";

const baseUrl = process.env["EXPO_PUBLIC_BASE_URL"] + "/auth";

interface refreshResponse {
  error?: string;
  status?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const RefreshTokens = async () => {
  const userID = await getUserID();
  const refreshToken = await getRefreshToken();

  const data = {
    userID: userID,
    refreshToken: refreshToken,
  };

  try {
    const response = await fetch(baseUrl + "/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: refreshResponse = await response.json();
    const accessTokenString = String(result.accessToken);
    const refreshTokenString = String(result.refreshToken);

    if (result.error === "invalid refresh token") {
      Promise.all([await deleteRefreshToken(), await deleteUserID()]);
      router.replace("/auth/logIn");
      return;
    }
    Promise.all([
      await setAccessToken(accessTokenString),
      await setRefreshToken(refreshTokenString),
    ]);
  } catch (error) {
    console.error("Error fetching OTP:", error);
    return null;
  }
};
