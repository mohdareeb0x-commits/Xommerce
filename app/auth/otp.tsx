import OtpInput from "@/components/inputs/OtpInput";
import { images } from "@/constants/images";
import { resetSignUp } from "@/redux/signup/signupSlice";
import { RootState } from "@/redux/store";
import { GetOtp, SignUp, VerifyOtp } from "@/service/authService";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setUserID,
} from "@/service/secureStoreService";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const otp = () => {
  const handleVerifyAndContinue = () => {
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
      if (!result) {
        Alert.alert("Unable to verify OTP");
        return;
      }

      if (result.error) {
        Alert.alert(result.error);
        return;
      }
      if (result) {
        const result = await SignUp(signupForm);
        if (!result) {
          Alert.alert("Network error");
          return;
        }

        if (result.error) {
          Alert.alert(result.error);
          return;
        }
        if (result) {
          const accessTokenString = String(result.accessToken);
          const refreshTokenString = String(result.refreshToken);
          const userID = String(result.userID);

          await setAccessToken(accessTokenString);
          const savedAT = await getAccessToken();

          if (!savedAT) {
            Alert.alert("Unable to save token");
            return;
          }

          await setRefreshToken(refreshTokenString);
          const savedRT = await getRefreshToken();

          if (!savedRT) {
            Alert.alert("Unable to save token");
            return;
          }
          await setUserID(userID);

          dispatch(resetSignUp());
          router.replace("/(tabs)");
        }
      }
    }
    verifyOtp();
  };
  const handleResendOTP = async () => {
    if (secondsLeft > 0 || sendingOTP) {
      return;
    }

    setSendingOTP(true);

    try {
      const result = await GetOtp({
        email: signupForm.email,
        username: signupForm.username,
      });

      if (!result) {
        Alert.alert("Unable to send OTP");
        return;
      }

      if (result.error) {
        Alert.alert(result.error);
        return;
      }

      Alert.alert("OTP sent successfully");

      setSecondsLeft(RESEND_DELAY);
    } finally {
      setSendingOTP(false);
    }
  };
  const signupForm = useSelector((state: RootState) => state.signup);
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [otpLengthErr, setOtpLengthErr] = useState(false);

  const RESEND_DELAY = 60;

  const [secondsLeft, setSecondsLeft] = useState(RESEND_DELAY);
  const [sendingOTP, setSendingOTP] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

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
                Didn't receive the OTP?
              </Text>
              <Pressable
                disabled={secondsLeft > 0 || sendingOTP}
                onPress={handleResendOTP}
              >
                <Text className="text-primary font-gilroySemiBold disabled:color-gray-400">
                  {sendingOTP
                    ? "Sending..."
                    : secondsLeft > 0
                      ? `Resend OTP in ${secondsLeft}s`
                      : "Resend OTP"}
                </Text>
              </Pressable>
            </View>
            <Pressable
              onPress={handleVerifyAndContinue}
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
