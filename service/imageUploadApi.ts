export const uploadImage = async (uri: string) => {
  const formData = new FormData();

  try {
    formData.append("file", {
      uri,
      type: "image/jpeg",
      name: "product.jpg",
    } as any);

    formData.append("upload_preset", "xommerce_unsigned");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/xvysy0ca/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    console.log("URL: ", data);
    return data.secure_url;
  } catch (err) {
    console.log("IMAGE UPLOAD ERR", err);
    throw new Error("Unable to upload photos");
  }
};
