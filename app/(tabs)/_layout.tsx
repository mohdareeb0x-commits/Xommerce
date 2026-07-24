import { toggleSeeAll } from "@/redux/chipCattegory/chipCattegorySlice";
import { toggleApply } from "@/redux/filter/filterSlice";
import { store } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { Provider, useDispatch } from "react-redux";

type IoniconName = ComponentProps<typeof Ionicons>["name"];
const TAB_ICONS: Record<
  "index" | "browse" | "cart" | "profile",
  { active: IoniconName; inactive: IoniconName }
> = {
  index: { active: "home", inactive: "home-outline" },
  browse: { active: "grid", inactive: "grid-outline" },
  cart: { active: "bag", inactive: "bag-outline" },
  profile: { active: "person", inactive: "person-outline" },
};

export default function TabLayout() {
  const dispatch = useDispatch();
  return (
    <Provider store={store}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const icons = TAB_ICONS[route.name as keyof typeof TAB_ICONS];
            const iconName = focused ? icons.active : icons.inactive;
            return <Ionicons name={iconName} size={size ?? 24} color={color} />;
          },
          tabBarLabelStyle: {
            fontFamily: "Jost_600SemiBold",
          },
          headerShown: false,
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "HOME",
          }}
          listeners={{
            tabPress: (e) => {
              dispatch(toggleApply());
            },
          }}
        />
        <Tabs.Screen
          name="browse"
          options={{ title: "BROWSE" }}
          listeners={{
            tabPress: (e) => {
              dispatch(toggleSeeAll(false));
            },
          }}
        />
        <Tabs.Screen name="cart" options={{ title: "CART" }} />
        <Tabs.Screen name="profile" options={{ title: "PROFILE" }} />
      </Tabs>
    </Provider>
  );
}
