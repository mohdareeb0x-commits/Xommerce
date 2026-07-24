import CustomAlert from "@/components/cards/CustomAlert";
import DefaultHeader from "@/components/headers/DefaultHeader";
import FormInput from "@/components/inputs/FormInput";
import { FormInputNumeric } from "@/components/inputs/FormInputNumeric";
import { getAllCategories } from "@/service/categroyApi";
import { checkInternet } from "@/service/checkInternet";
import { uploadImage } from "@/service/imageUploadApi";
import { CreateProduct } from "@/service/productApi";
import { Category } from "@/types/categoryType";
import { ProductForm } from "@/types/productFormType";
import Feather from "@expo/vector-icons/build/Feather";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MAX_IMAGES = 5;

export default function CreateProductScreen() {
  const { control, watch, setValue, handleSubmit } = useForm<ProductForm>({
    defaultValues: {
      sku: "",
      name: "",
      description: "",
      category: "",
      price: 0,
      discount: 0,
      discountedPrice: 0,
      stock: 0,
      seller: "",
      tags: "",
      specifications: [
        {
          key: "",
          value: "",
        },
      ],
      images: [],
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });

  const price = watch("price");
  const discount = watch("discount");
  const images = watch("images");

  useEffect(() => {
    const discounted = Number(price) - (Number(price) * Number(discount)) / 100;

    setValue("discountedPrice", discounted);
  }, [price, discount]);

  const pickImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Gallery permission required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (result.canceled) return;

    if (result.assets.length > MAX_IMAGES) {
      alert(`You can select a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const selected = result.assets.map((asset, index) => ({
      url: asset.uri,
      alt: "",
      isPrimary: index === 0,
    }));

    setValue("images", selected);
  };

  type CreateError =
    "internet error" | "create failed" | "images not uploaded" | null;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createError, setCreateError] = useState<CreateError>(null);
  const [catErr, setCatErr] = useState<boolean>(false);
  console.log("CREATE ERROR", createError);

  const onSubmit = async (data: ProductForm) => {
    try {
      setIsLoading(true);

      const isInternetConnected = await checkInternet();
      if (!isInternetConnected) {
        throw new Error("No Internet Connection");
      }

      console.log(data);
      if (data.images.length === 0) {
        throw new Error("Images not selected;");
      }
      const uploadedImages = await Promise.all(
        data.images.map(async (img) => ({
          url: await uploadImage(img.url),
          alt: img.alt,
          isPrimary: img.isPrimary,
        })),
      );
      data.images = uploadedImages;
      CreateProduct(data);
    } catch (err) {
      console.log("onsubmit err", err);

      if (err == "No Internet Connection") {
        setCreateError("internet error");
      } else {
        setCreateError("create failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const isConnected = checkInternet();
    if (!isConnected) {
      setCreateError("internet error");
      return;
    }
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();
        if (result === "Can't Fetch") {
          throw new Error("Unable to fetch cat");
        }
        setCategories(result);
      } catch (err) {
        console.log("GET ALL CaT ERR", err);
        setCatErr(true);
      }
    };

    fetchCategories();
  }, []);

  return (
    <SafeAreaView className="justify-center">
      {createError === "create failed" && (
        <CustomAlert
          alertMsg="Unable to create product"
          onPress={() => setCreateError(null)}
        />
      )}
      {createError === "internet error" && (
        <CustomAlert
          alertMsg="No internet connection"
          onPress={() => setCreateError(null)}
        />
      )}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <DefaultHeader headerLabel="Create Product" />
        <View className="w-10/12 pt-24 self-center gap-3">
          <Text className="text-2xl font-bold">Product Details</Text>

          <View className="gap-2">
            <Text className="text-lg font-medium">Product Name*</Text>
            <FormInput
              control={control}
              name="name"
              placeholder="Product Name"
              required="Product Name is required"
            />
          </View>

          <View className="gap-2">
            <Text className="text-lg font-medium">SKU*</Text>

            <FormInput
              control={control}
              name="sku"
              placeholder="SKU"
              required="SKU is required"
            />
          </View>
          <View className="gap-2">
            <Text className="text-lg font-medium">Description*</Text>

            <FormInput
              control={control}
              name="description"
              placeholder="Description"
              required="Product description is required"
            />
          </View>
          <View className="gap-2">
            <Text className="text-lg font-medium">Category*</Text>
            <View className="border-gray-300 border rounded-xl">
              <Controller
                control={control}
                name="category"
                rules={{
                  required: "Category field is required",
                }}
                render={({ field }) => (
                  <Picker
                    selectedValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <Picker.Item label="Select Category" value="" />

                    {catErr === false &&
                      categories.map((category) => (
                        <Picker.Item
                          key={category.id}
                          label={category.name}
                          value={category.id}
                        />
                      ))}
                  </Picker>
                )}
              />
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-lg font-medium">Price - $*</Text>

            <FormInputNumeric control={control} name="price" />
          </View>
          <View className="gap-2">
            <Text className="text-lg font-medium">Discount - %</Text>

            <FormInputNumeric control={control} name="discount" />
          </View>

          <View className="gap-2">
            <Text className="text-lg font-medium">Discounted Price - $</Text>

            <FormInputNumeric control={control} name="discountedPrice" />
          </View>

          <View className="gap-2">
            <Text className="text-lg font-medium">Stock</Text>

            <FormInputNumeric control={control} name="stock" />
          </View>

          <View className="gap-2">
            <Text className="text-lg font-medium">Tags</Text>

            <FormInput
              control={control}
              name="tags"
              placeholder="apple,laptop,m3"
              required="tags are required"
            />
          </View>

          <View className="flex-row items-center my-5">
            <Text className="text-lg font-medium">Active</Text>

            <Controller
              control={control}
              name="isActive"
              render={({ field }) => (
                <Switch value={field.value} onValueChange={field.onChange} />
              )}
            />
          </View>

          <View className="gap-4">
            <Text className="text-lg font-medium">
              Images (Maximum 5 Images)*
            </Text>
            <View className="flex-row gap-2 items-center">
              <Feather name="info" size={15} color="#ea580c" />
              <Text className="color-orange-600 text-sm">
                Upload in 1:1 resolution for better experience
              </Text>
            </View>

            <Pressable
              className="items-center bg-black py-3 rounded-xl"
              onPress={pickImages}
            >
              <Text className="font-bold color-white text-lg">Pick Images</Text>
            </Pressable>

            <FlatList
              horizontal
              data={images}
              keyExtractor={(item) => item.url}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.url }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
              )}
            />
          </View>
          <Text className="text-lg font-medium">Specifications</Text>

          {fields.map((field, index) => (
            <View key={field.id} className="gap-3">
              <Controller
                control={control}
                name={`specifications.${index}.key`}
                render={({ field }) => (
                  <TextInput
                    className="border border-gray-300 rounded-xl px-5 py-3 text-lg"
                    placeholder="Key"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name={`specifications.${index}.value`}
                render={({ field }) => (
                  <TextInput
                    className="border border-gray-300 rounded-xl px-5 py-3 text-lg"
                    placeholder="Value"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />

              <Pressable
                className="border-2 items-center border-blue-500 py-2 rounded-xl"
                onPress={() => remove(index)}
              >
                <Text className="font-bold color-blue-500 text-lg">Remove</Text>
              </Pressable>
            </View>
          ))}

          <Pressable
            className="border-2 items-center border-blue-500 py-2 rounded-xl"
            onPress={() =>
              append({
                key: "",
                value: "",
              })
            }
          >
            <Text className="font-bold color-blue-500 text-lg">
              Add Specification{" "}
            </Text>
          </Pressable>

          <View style={{ height: 30 }} />

          <Pressable
            disabled={isLoading}
            className="items-center bg-blue-500 py-3 rounded-xl"
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="font-bold color-white text-lg">
                Create Product
              </Text>
            )}
          </Pressable>

          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
