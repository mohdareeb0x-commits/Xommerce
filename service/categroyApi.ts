const baseUrl = "http://10.185.89.79:8080/api/v1/category";

export const getAllCategories = async () => {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Can't fetch categories");
  }

  const result = await response.json();

  return result;
};
