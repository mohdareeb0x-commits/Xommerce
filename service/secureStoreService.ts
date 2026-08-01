import * as SecureStore from "expo-secure-store";

// GET services
export const getAccessToken = async () => {
  try {
    const data = await SecureStore.getItemAsync("accessToken");
    if (data === null) {
      throw new Error("Can't get the access token");
    }
    console.log("Access token retrieved:", data);
    return data;
  } catch {
    return null;
  }
};

export const getRefreshToken = async () => {
  try {
    const data = await SecureStore.getItemAsync("refreshToken");
    if (data === null) {
      throw new Error("Can't get the refresh token");
    }
    console.log("Refresh token retrieved:", data);
    return data;
  } catch {
    return null;
  }
};

export const getUserID = async () => {
  try {
    const data = await SecureStore.getItemAsync("userID");
    if (data === null) {
      throw new Error("Can't get the userID");
    }
    console.log("userID retrieved:", data);
    return data;
  } catch {
    return null;
  }
};

// SET services
export const setAccessToken = async (accessToken: string) => {
  try {
    await SecureStore.setItemAsync("accessToken", accessToken);
  } catch (error) {
    console.error("Error setting access token:", error);
  }
};

export const setRefreshToken = async (refreshToken: string) => {
  try {
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  } catch (error) {
    console.error("Error setting refresh token:", error);
  }
};

export const setUserID = async (userID: string) => {
  try {
    await SecureStore.setItemAsync("userID", userID);
  } catch (error) {
    console.error("Error setting userID:", error);
  }
};

// DELETE services
export const deleteAccessToken = async () => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
  } catch (error) {
    console.error("Error deleting access token:", error);
  }
};

export const deleteRefreshToken = async () => {
  try {
    await SecureStore.deleteItemAsync("refreshToken");
  } catch (error) {
    console.error("Error deleting refresh token:", error);
  }
};

export const deleteUserID = async () => {
  try {
    await SecureStore.deleteItemAsync("userID");
  } catch (error) {
    console.error("Error deleting userID:", error);
  }
};
