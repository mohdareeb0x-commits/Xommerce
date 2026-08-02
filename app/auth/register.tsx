import { images } from "@/constants/images";
import {
  setEmail,
  setPassword,
  setUsername,
  SignupState,
} from "@/redux/signup/signupSlice";
import { RootState } from "@/redux/store";
import { GetOtp } from "@/service/authService";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

const handlePressSignUp = async (
  signupForm: SignupState,
  setformValueEmpty: Dispatch<SetStateAction<boolean>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
) => {
  setIsLoading(true);
  if (
    signupForm.email === "" ||
    signupForm.username === "" ||
    signupForm.password === ""
  ) {
    setformValueEmpty(true);
    setIsLoading(false);
    return;
  }
  const request = {
    email: signupForm.email,
    username: signupForm.username,
  };

  const result = await GetOtp(request);
  if (result && result.error === "email already exists") {
    Alert.alert("Email already exists. Please use a different email.");
    setIsLoading(false);
    return;
  }
  if (
    result &&
    (result.error === "unable to send otp" || result.error === "bad request")
  ) {
    Alert.alert("Error sending OTP. Please try again.");
    setIsLoading(false);
    return;
  }
  setIsLoading(false);
  router.push("/auth/otp");
};

const register = () => {
  const signupForm = useSelector((state: RootState) => state.signup);
  const dispatch = useDispatch();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [eyeIcon, setEyeIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValueEmpty, setformValueEmpty] = useState(false);

  useEffect(() => {
    if (
      signupForm.email !== "" &&
      signupForm.username !== "" &&
      signupForm.password !== ""
    ) {
      setformValueEmpty(false);
    }
  }, [signupForm]);

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
              source={images.registerBg}
              resizeMode="cover"
              className="w-full h-72 rounded-2xl"
            />
          </View>
          <View className="w-11/12">
            <Text className="font-gilroySemiBold text-2xl">Create Account</Text>
            <Text className="font-gilroySemiBold text-sm color-gray-400">
              Join the Xommerce community for exclusive tech deals.
            </Text>
          </View>
          <View className="w-11/12 gap-2">
            <Text className="font-jostSemiBold text-md color-gray-500">
              FULL NAME
            </Text>
            <View className="flex-row items-center gap-2 w-full border border-gray-300 rounded-2xl px-5">
              <Ionicons name="person" size={20} color="#6b7280" />
              <TextInput
                className="color-gray-500 w-full text-lg font-gilroyMedium"
                value={signupForm.username}
                onChangeText={(text) => dispatch(setUsername(text))}
                placeholder="Enter your full name"
              />
            </View>
          </View>
          <View className="w-11/12 gap-2">
            <Text className="font-jostSemiBold text-md color-gray-500">
              EMAIL ADDRESS
            </Text>
            <View className="flex-row items-center gap-2 w-full border border-gray-300 rounded-2xl px-5">
              <Ionicons name="mail" size={20} color="#6b7280" />
              <TextInput
                className="color-gray-500 w-full text-lg font-gilroyMedium"
                value={signupForm.email}
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
                value={signupForm.password}
                onChangeText={(text) => dispatch(setPassword(text))}
                secureTextEntry={!eyeIcon}
                placeholder="Min. 8 characters"
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
          <View className="w-11/12 gap-2">
            <Text className="font-jostSemiBold text-md color-gray-500">
              CONFIRM PASSWORD
            </Text>
            <View className="flex-row items-center gap-2 w-full border border-gray-300 rounded-2xl px-5">
              <Ionicons name="lock-closed" size={20} color="#6b7280" />
              <TextInput
                className="color-gray-500 w-4/5 text-lg font-gilroyMedium"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!eyeIcon}
                placeholder="Repeat Password"
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
          <View
            className={
              signupForm.password !== confirmPassword ? "w-11/12" : "hidden"
            }
          >
            <Text className="font-jost text-sm color-red-400">
              Password mismatch. Please ensure both password fields match before
              proceeding.
            </Text>
          </View>
          <View className={formValueEmpty ? "w-11/12" : "hidden"}>
            <Text className="font-jost text-sm color-red-400">
              Please fill in all fields.
            </Text>
          </View>
          <View className="w-11/12 gap-3"></View>
          <View className="w-full justify-center items-center gap-3">
            <Pressable
              onPress={() => {
                handlePressSignUp(signupForm, setformValueEmpty, setIsLoading);
              }}
              className="flex-row bg-primary p-4 gap-2 justify-center rounded-full w-11/12"
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size={22} />
              ) : (
                <>
                  <FontAwesome name="sign-in" size={24} color="white" />
                  <Text className="color-white text-lg font-jostSemiBold">
                    Sign Up
                  </Text>
                </>
              )}
            </Pressable>
            <View className="w-5/6 h-[1.5px] bg-gray-300"></View>
            <Pressable className="flex-row border-2 border-primary bg-white p-3 gap-2 justify-center rounded-full w-11/12">
              <FontAwesome name="google" size={24} color="#2563eb" />
              <Text className="color-primary text-lg font-jostSemiBold">
                Continue with Google
              </Text>
            </Pressable>
          </View>
          <View className="flex-row gap-1">
            <Text className="font-gilroySemiBold">
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push("/auth/logIn")}>
              <Text className="text-primary font-gilroySemiBold">Sign In</Text>
            </Pressable>
          </View>
          <View className="flex-row w-11/12 gap-4 justify-center bg-tertiary p-5 rounded-3xl">
            <View>
              <Octicons name="shield-check" size={22} color="#2563eb" />
            </View>
            <View className="gap-2 w-4/5">
              <Text className="font-gilroySemiBold">Your Security Matters</Text>
              <Text className="font-jost">
                We use industry-leading encryption to keep your data safe. By
                signing up, you agree to our Terms and Privacy Policy.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default register;
