// services/api.ts

import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
    deleteAccessToken,
    deleteRefreshToken,
    deleteUserID,
} from "./secureStoreService";

const BASE_URL = process.env["EXPO_PUBLIC_BASE_URL"];

let refreshPromise: Promise<string | null> | null = null;

async function logout() {
  await deleteAccessToken();
  await deleteRefreshToken();
  await deleteUserID();

  // Navigate to login screen from your app entry/root layout.
  router.replace("/auth/logIn");
  // Avoid importing router here to prevent circular dependencies.
}

export async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      const userID = await SecureStore.getItemAsync("userID");

      if (!refreshToken) {
        return null;
      }
      if (!userID) {
        return null;
      }

      console.log(refreshToken, userID, "are refresh token and user id");

      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          refreshToken,
        }),
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      if (!data.accessToken || !data.refreshToken) {
        return null;
      }

      await SecureStore.setItemAsync("accessToken", data.accessToken);

      await SecureStore.setItemAsync("refreshToken", data.refreshToken);

      return data.accessToken;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  retry = true,
): Promise<Response> {
  const accessToken = await SecureStore.getItemAsync("accessToken");

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(`${endpoint}`, {
    ...options,
    headers,
  });

  // Access token is still valid
  if (response.status !== 401) {
    return response;
  }

  // Prevent infinite refresh loops
  if (!retry) {
    await logout();
    throw new Error("Unauthorized");
  }

  const newAccessToken = await refreshAccessToken();

  if (!newAccessToken) {
    await logout();
    throw new Error("Session expired");
  }

  headers.set("Authorization", `Bearer ${newAccessToken}`);

  response = await fetch(`${endpoint}`, {
    ...options,
    headers,
  });

  return response;
}
