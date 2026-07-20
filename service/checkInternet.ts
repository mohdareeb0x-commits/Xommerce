import NetInfo from "@react-native-community/netinfo";

export const checkInternet = async () => {
  const state = await NetInfo.fetch();

  if (!state.isConnected || !state.isInternetReachable) {
    return false;
  }

  return true;
};
