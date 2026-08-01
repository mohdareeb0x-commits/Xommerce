const baseUrl = process.env["EXPO_PUBLIC_BASE_URL"] + "/auth";

interface OtpRequest {
  email: string;
  username: string;
}

interface OtpResponse {
  status?: string;
  error?: string;
}
export const GetOtp = async (data: OtpRequest) => {
  try {
    const response = await fetch(baseUrl + "/sendotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result: OtpResponse = await response.json();
    if (result.error) {
      return result;
    }
    if (!response.ok) {
      throw new Error("Unable to get OTP");
    }
    return result;
  } catch (error) {
    console.error("Error fetching OTP:", error);
    return null;
  }
};

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export const VerifyOtp = async (data: VerifyOtpRequest) => {
  try {
    const response = await fetch(baseUrl + "/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Unable to verify OTP");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return null;
  }
};

interface SignupRequest {
  email: string;
  username: string;
  password: string;
}

interface SignupResponse {
  success: string;
  accessToken: string;
  refreshToken: string;
  userID: string;
}

export const SignUp = async (data: SignupRequest) => {
  try {
    const response = await fetch(baseUrl + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Unable to sign up");
    }
    const result: SignupResponse = await response.json();
    console.log("SignUp response:", result);
    return result;
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  success?: string;
  error?: string;
  accessToken?: string;
  refreshToken?: string;
  userID?: string;
}

export const SignIn = async (data: SignInRequest) => {
  try {
    const response = await fetch(baseUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result: SignInResponse = await response.json();
    if (result.error) {
      return result;
    }
    if (!response.ok) {
      throw new Error("Unable to sign in");
    }
    console.log("SignIn response:", result);
    return result;
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
};
