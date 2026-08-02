const baseUrl = process.env["EXPO_PUBLIC_CLOUDINARY_URL"] + "image/upload";
const presetName = process.env["EXPO_PUBLIC_CLOUDINARY_PRESET_NAME"];

export const uploadImage = async (uri: string) => {
  const formData = new FormData();
  if (!presetName) {
    console.warn("EXPO_PUBLIC_CLOUDINARY_PRESET_NAME is not set");
    return;
  }

  try {
    formData.append("file", {
      uri,
      type: "image/jpeg",
      name: "product.jpg",
    } as any);

    formData.append("upload_preset", presetName);

    const response = await fetch(baseUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  } catch (err) {
    throw new Error("Unable to upload photos");
  }
};
