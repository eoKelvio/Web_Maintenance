import { Octicons, Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Platform, TouchableOpacity } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  return (
    <Tabs
      safeAreaInsets={{ bottom: Platform.OS === "ios" ? 35 : 10 }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="graph" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="machines"
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="apps" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="maintenance"
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="tools" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="people" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stock"
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="package" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "User",
          headerRight: () => <ThemeToggle />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.push("/login");
              }}
              className="pl-8"
            >
              <Ionicons
                name="log-out-outline"
                size={28}
                color={
                  useColorScheme().colorScheme === "dark" ? "white" : "black"
                }
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
