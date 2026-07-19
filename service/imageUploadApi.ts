export const uploadImage = async (uri: string) => {
  const formData = new FormData();

  formData.append("file", {
    uri,
    type: "image/jpeg",
    name: "product.jpg",
  } as any);

  formData.append("upload_preset", "products");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  return data.secure_url;
};
