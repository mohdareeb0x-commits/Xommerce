import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

const DefaultHeader = ({ headerLabel }: { headerLabel: string }) => {
  return (
    <View className="flex flex-row items-center absolute w-full justify-between p-5 bg-white shadow shadow-slate-500 z-50">
      <View className="flex flex-row items-center ">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={18}
            color="black"
            className="mr-5"
          />
        </Pressable>
        <Text className="text-xl color-black font-jostSemiBold">
          {headerLabel}
        </Text>
      </View>
    </View>
  );
};

export default DefaultHeader;
