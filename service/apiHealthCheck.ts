const baseUrl = process.env["EXPO_PUBLIC_BASE_URL"] + "/health";

export const getApiHealth = async () => {
  if (!baseUrl) {
    console.warn("EXPO_PUBLIC_BASE_URL is not set");
    return;
  }
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
