import { images } from "@/constants/images";
import { resetSignIn } from "@/redux/signIn/signinSlice";
import { setEmail, setPassword } from "@/redux/signup/signupSlice";
import { RootState } from "@/redux/store";
import { SignIn } from "@/service/authService";
import {
  setAccessToken,
  setRefreshToken,
  setUserID,
} from "@/service/secureStoreService";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const logIn = () => {
  const handlePressSignIn = async (
    // signInForm: SigninState,
    // setFieldEmptyErr: Dispatch<SetStateAction<boolean>>,
    // setInvalidCredentialErr: Dispatch<SetStateAction<boolean>>,
    // setIsLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    setIsLoading(true);
    if (signInForm.email === "" || signInForm.password === "") {
      setFieldEmptyErr(true);
      setIsLoading(false);
      return;
    }
    const result = await SignIn(signInForm);
    if (
      result &&
      (!result.accessToken || !result.refreshToken || !result.userID)
    ) {
      Alert.alert("Invalid login response");
      setIsLoading(false);
      return;
    }
    if (result && result.error === "invalid email or password") {
      setInvalidCredentialErr(true);
      setIsLoading(false);
      return;
    }
    if (result) {
      const accessTokenString = String(result.accessToken);
      const refreshTokenString = String(result.refreshToken);
      const userID = String(result.userID);
      await setAccessToken(accessTokenString);
      await setRefreshToken(refreshTokenString);
      await setUserID(userID);

      dispatch(resetSignIn());
      router.replace("/(tabs)");
    }
    setIsLoading(false);
  };
  const signInForm = useSelector((state: RootState) => state.signin);
  const dispatch = useDispatch();

  const [fieldEmptyErr, setFieldEmptyErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidCredentialErr, setInvalidCredentialErr] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);

  useEffect(() => {
    if (signInForm.email !== "" && signInForm.password !== "") {
      setFieldEmptyErr(false);
      setInvalidCredentialErr(false);
    }
  }, [signInForm]);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full items-center justify-center pt-5 pb-20 gap-5">
          <View className="items-center">
            <Image
              source={images.appLogo}
              resizeMode="cover"
              className="w-10 h-10 rounded-md"
            />
          </View>
          <View className="w-11/12 items-center justify-center rounded-xl">
            <Image
              source={images.signupBg}
              resizeMode="cover"
              className="w-full h-72 rounded-2xl"
            />
          </View>
          <View className="w-11/12">
            <Text className="font-gilroySemiBold text-2xl">Welcome Back</Text>
            <Text className="font-gilroySemiBold text-sm color-gray-400">
              Sign in to access your tech wishlist and deals.
            </Text>
          </View>
          <View className="w-11/12 gap-2">
            <Text className="font-jostSemiBold text-md color-gray-500">
              EMAIL ADDRESS
            </Text>
            <View className="flex-row items-center gap-2 w-full border border-gray-300 rounded-2xl px-5">
              <Ionicons name="mail" size={20} color="#6b7280" />
              <TextInput
                className="color-gray-500 w-full text-lg font-gilroyMedium"
                value={signInForm.email}
                onChangeText={(text) => dispatch(setEmail(text))}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <View className="w-11/12 gap-2">
            <Text className="font-jostSemiBold text-md color-gray-500">
              PASSWORD
            </Text>
            <View className="flex-row items-center gap-2 w-full border border-gray-300 rounded-2xl px-5">
              <Ionicons name="lock-closed" size={20} color="#6b7280" />
              <TextInput
                className="color-gray-500 w-4/5 text-lg font-gilroyMedium"
                value={signInForm.password}
                onChangeText={(text) => dispatch(setPassword(text))}
                placeholder="Min. 8 characters"
                secureTextEntry={!eyeIcon}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
              />
              <Pressable onPress={() => setEyeIcon(!eyeIcon)}>
                <Ionicons
                  name={eyeIcon ? "eye" : "eye-off"}
                  size={20}
                  color="#6b7280"
                />
              </Pressable>
            </View>
          </View>
          <View className={fieldEmptyErr ? "w-11/12" : "hidden"}>
            <Text className="font-jost text-sm color-red-400">
              Please fill in all fields
            </Text>
          </View>
          <View className={invalidCredentialErr ? "w-11/12" : "hidden"}>
            <Text className="font-jost text-sm color-red-400">
              Invalid email or password
            </Text>
          </View>
          <View className="w-full justify-center items-center gap-3">
            <Pressable
              onPress={handlePressSignIn}
              disabled={isLoading}
              className="flex-row bg-primary p-4 gap-2 justify-center rounded-full w-11/12"
            >
              {isLoading ? (
                <ActivityIndicator color="white" size={22} />
              ) : (
                <>
                  <FontAwesome name="sign-in" size={24} color="white" />
                  <Text className="color-white text-lg font-jostSemiBold">
                    Sign In
                  </Text>
                </>
              )}
            </Pressable>
            <View className="w-5/6 h-[1.5px] bg-gray-300"></View>
            <Pressable className="flex-row border-2 border-primary bg-white p-3 gap-2 justify-center rounded-full w-11/12">
              <FontAwesome name="google" size={24} color="#2563eb" />
              <Text className="color-primary text-lg font-jostSemiBold">
                Sign in with Google
              </Text>
            </Pressable>
          </View>
          <View className="flex-row gap-1">
            <Text className="font-gilroySemiBold">New to Xommerce?</Text>
            <Pressable onPress={() => router.push("/auth/register")}>
              <Text className="text-primary font-gilroySemiBold">
                Create Account
              </Text>
            </Pressable>
          </View>
          <View className="flex-row w-11/12 gap-4 justify-center bg-tertiary p-5 rounded-3xl">
            <View>
              <Octicons name="shield-check" size={22} color="#2563eb" />
            </View>
            <View className="gap-2 w-4/5">
              <Text className="font-gilroySemiBold">Secure Login</Text>
              <Text className="font-jost">
                Your connection is encrypted with 256-bit SSL technology. We
                never share your credentials with third parties.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default logIn;
