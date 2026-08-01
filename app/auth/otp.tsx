import OtpInput from "@/components/inputs/OtpInput";
import { images } from "@/constants/images";
import { SignupState } from "@/redux/signup/signupSlice";
import { RootState } from "@/redux/store";
import { GetOtp, SignUp, VerifyOtp } from "@/service/authService";
import {
    setAccessToken,
    setRefreshToken,
    setUserID,
} from "@/service/secureStoreService";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const handleVerifyAndContinue = (
  signupForm: SignupState,
  otp: string,
  setOtpLengthErr: Dispatch<SetStateAction<boolean>>,
) => {
  async function verifyOtp() {
    if (otp.length !== 6) {
      setOtpLengthErr(true);
      return;
    }
    const request = {
      email: signupForm.email,
      otp: otp,
    };
    const result = await VerifyOtp(request);
    if (result) {
      const result = await SignUp(signupForm);
      if (result) {
        const accessTokenString = String(result.accessToken);
        const refreshTokenString = String(result.refreshToken);
        const userID = String(result.userID);
        await setAccessToken(accessTokenString);
        await setRefreshToken(refreshTokenString);
        await setUserID(userID);

        router.push("/(tabs)");
      }
    }
  }
  verifyOtp();
};

const otp = () => {
  const signupForm = useSelector((state: RootState) => state.signup);

  const [otp, setOtp] = useState("");
  const [otpLengthErr, setOtpLengthErr] = useState(false);

  useEffect(() => {
    async function getOtp() {
      const request = {
        email: signupForm.email,
        username: signupForm.username,
      };

      const result = await GetOtp(request);
      if (result && result.error === "email already exists") {
        Alert.alert("Email already exists. Please use a different email.");
        router.push("/auth/register");
        return;
      }
      if (
        result &&
        (result.error === "unable to send otp" ||
          result.error === "bad request")
      ) {
        Alert.alert("Error sending OTP. Please try again.");
        router.push("/auth/register");
        return;
      }
      if (result) {
        console.log("OTP sent successfully");
      }
    }
    getOtp();
  }, []);

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
            <Text className="font-gilroySemiBold text-2xl">
              Verify Your Code
            </Text>
            <Text className="font-gilroySemiBold text-sm color-gray-400">
              Enter the 6-digit code sent to your email.
            </Text>
          </View>
          <View className="w-11/12 gap-2">
            <OtpInput value={otp} setValue={setOtp} />
          </View>
          <View className={otpLengthErr ? "w-11/12" : "hidden"}>
            <Text className="font-jost text-sm color-red-400">
              OTP must be 6 digits
            </Text>
          </View>
          <View className="w-full justify-center items-center gap-3">
            <View className="flex-row gap-1">
              <Text className="font-gilroySemiBold">
                Didn't receive the code?
              </Text>
              <Pressable onPress={() => router.push("/auth/register")}>
                <Text className="text-primary font-gilroySemiBold">
                  Resend Code
                </Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() =>
                handleVerifyAndContinue(signupForm, otp, setOtpLengthErr)
              }
              className="flex-row bg-primary p-4 gap-2 justify-center items-center rounded-full w-11/12"
            >
              <Text className="color-white text-lg font-jostSemiBold">
                Verify & Continue
              </Text>
              <MaterialIcons name="arrow-forward-ios" size={16} color="white" />
            </Pressable>
          </View>
          <View className="flex-row w-11/12 gap-4 justify-center bg-tertiary p-5 rounded-3xl">
            <View>
              <Octicons name="shield-check" size={22} color="#2563eb" />
            </View>
            <View className="gap-2 w-4/5">
              <Text className="font-gilroySemiBold">Secure Authentication</Text>
              <Text className="font-jost">
                Your security is our priority. The OTP ensures that only you can
                access your account. By verifying, you agree to our Terms and
                Privacy Policy.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default otp;
