import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

const PromoBanner = () => {
  return (
    <View className="flex-row w-11/12 bg-tertiary justify-between items-center p-5 rounded-3xl">
      <View>
        <Text className="text-xs color-primary font-jostSemiBold">
          FREE SHIPPING
        </Text>
        <Text className="text-lg font-jostBold color-black">
          On Orders $500+
        </Text>
        {/* <Text className="text-xs font-jostMedium color-gray-400">
          Use code at checkout. Valid through july 31.
        </Text>
        <View className="bg-white items-center justify-center p-2 w-32 rounded-lg border border-dashed border-blue-500">
          <Text className="color-blue-500 font-jostBold">SHIPFREE0</Text>
        </View> */}
      </View>
      <View className="bg-tertiary_dark p-4 rounded-full">
        <Feather name="truck" size={22} color="#2563eb" />
        {/* <Image
          source={{
            uri: "https://img.magnific.com/premium-vector/free-shipping-offer-free-delivery-vector-poster-white-background-promotion-flat-illustration_185004-294.jpg?semt=ais_hybrid&w=740&q=80",
          }}
          className="w-full h-full rounded-2xl"
          resizeMode="cover"
        />
       */}
      </View>
    </View>
  );
};

export default PromoBanner;
