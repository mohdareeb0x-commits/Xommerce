import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";

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
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name as keyof typeof TAB_ICONS];
          const iconName = focused ? icons.active : icons.inactive;
          return <Ionicons name={iconName} size={size ?? 24} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen name="browse" options={{ title: "Browse" }} />
      <Tabs.Screen name="cart" options={{ title: "Cart" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
