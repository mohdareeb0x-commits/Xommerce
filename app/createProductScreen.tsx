import FormInput from "@/components/inputs/FormInput";
import { FormInputNumeric } from "@/components/inputs/FormInputNumeric";
import { getAllCategories } from "@/service/categroyApi";
import { uploadImage } from "@/service/imageUploadApi";
import { CreateProduct } from "@/service/productApi";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
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

type ProductImage = {
  url: string;
  alt: string;
  isPrimary: boolean;
};

type Specification = {
  key: string;
  value: string;
};

export type ProductForm = {
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  discountedPrice: number;
  stock: number;
  seller: string;
  tags: string;
  specifications: Specification[];
  images: ProductImage[];
  isActive: boolean;
};

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

    const selected = result.assets.map((asset, index) => ({
      url: asset.uri,
      alt: "",
      isPrimary: index === 0,
    }));

    setValue("images", selected);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: ProductForm) => {
    console.log(data);
    const uploadedImages = await Promise.all(
      data.images.map(async (img) => ({
        url: await uploadImage(img.url),
        alt: img.alt,
        isPrimary: img.isPrimary,
      })),
    );
    data.images = uploadedImages;
    CreateProduct(data);
    // await uploadImage(data.i)

    /*
    Upload images



    await axios.post("/products", data);
    */
  };
  type Category = {
    id: string;
    name: string;
    slug: string;
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="w-10/12 self-center gap-3">
          <Text className="text-2xl font-bold">Product Details</Text>

          <View className="gap-2">
            <Text className="text-lg font-medium">Product Name</Text>
            <FormInput
              control={control}
              name="name"
              placeholder="Product Name"
            />
          </View>

          <View className="gap-2">
            <Text className="text-lg font-medium">SKU</Text>

            <FormInput control={control} name="sku" placeholder="SKU" />
          </View>
          <View className="gap-2">
            <Text className="text-lg font-medium">Description</Text>

            <FormInput
              control={control}
              name="description"
              placeholder="Description"
            />
          </View>
          <View className="gap-2">
            <Text className="text-lg font-medium">Category</Text>

            {/* <FormInput
              control={control}
              name="category"
              placeholder="Category"
            /> */}
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Picker
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                >
                  <Picker.Item label="Select Category" value="" />

                  {categories.map((category) => (
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
          {/* <View className="gap-2">
            <Text className="text-lg font-medium">Subcategory</Text>

            <FormInput
              control={control}
              name="subcategory"
              placeholder="Subcategory"
            />
          </View> */}
          <View className="gap-2">
            <Text className="text-lg font-medium">Price</Text>

            <FormInputNumeric control={control} name="price" />
          </View>
          <View className="gap-2">
            <Text className="text-lg font-medium">Discount</Text>

            <FormInputNumeric control={control} name="discount" />
          </View>
          {/* <Controller
          control={control}
          name="discount"
          render={({ field }) => (
            <TextInput
              keyboardType="numeric"
              value={String(field.value)}
              onChangeText={(text) => field.onChange(Number(text))}
            />
          )}
        /> */}

          <View className="gap-2">
            <Text className="text-lg font-medium">Discounted Price</Text>

            <FormInputNumeric control={control} name="discountedPrice" />
          </View>
          {/* <Controller
        control={control}
        name="discountedPrice"
        render={({ field }) => (
          <TextInput editable={false} value={String(field.value)} />
        )}
      /> */}

          <View className="gap-2">
            <Text className="text-lg font-medium">Stock</Text>

            <FormInputNumeric control={control} name="stock" />
          </View>
          {/* <Controller
        control={control}
        name="stock"
        render={({ field }) => (
          <TextInput
            keyboardType="numeric"
            value={String(field.value)}
            onChangeText={(text) => field.onChange(Number(text))}
          />
        )}
      /> */}

          {/* <Text className="text-lg font-medium">Seller</Text>

          <Controller
            control={control}
            name="seller"
            render={({ field }) => (
              <TextInput value={field.value} onChangeText={field.onChange} />
            )}
          /> */}

          <View className="gap-2">
            <Text className="text-lg font-medium">Tags</Text>

            <FormInput
              control={control}
              name="tags"
              placeholder="apple,laptop,m3"
            />
          </View>
          {/* <Controller
        control={control}
        name="tags"
        render={({ field }) => (
          <TextInput
            placeholder="apple,laptop,m3"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      /> */}

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

          <Text className="text-lg font-medium">Images</Text>

          {/* <TouchableOpacity
            onPress={pickImages}
            style={{
              backgroundColor: "#007AFF",
              padding: 15,
              borderRadius: 8,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Pick Images
            </Text>
          </TouchableOpacity> */}
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

              {/* <Button title="Remove" onPress={() => remove(index)} /> */}
              <Pressable
                className="border-2 items-center border-blue-500 py-2 rounded-xl"
                onPress={() => remove(index)}
              >
                <Text className="font-bold color-blue-500 text-lg">Remove</Text>
              </Pressable>
            </View>
          ))}

          {/* <Button
            title="Add Specification"
            onPress={() =>
              append({
                key: "",
                value: "",
              })
            }
          /> */}
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
            className="items-center bg-blue-500 py-3 rounded-xl"
            onPress={
              //   setIsLoading(true);
              handleSubmit(onSubmit)
              //   setIsLoading(false);
            }
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
