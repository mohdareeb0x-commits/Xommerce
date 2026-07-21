const baseUrl = "http://10.185.89.79:8080/api/v1/health";

export const getApiHealth = async () => {
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
