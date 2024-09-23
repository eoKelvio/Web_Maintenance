import { Octicons, Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  return (
    <Tabs
      safeAreaInsets={{ bottom: Platform.OS === "ios" ? 35 : 10 }}
      screenOptions={{
        headerStyle: { height: 70 },
        headerTitleStyle: { fontWeight: 700, fontSize: 15 },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "RECARO",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="graph" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="machines"
        options={{
          title: "MÁQUINAS",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="apps" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="maintenance"
        options={{
          title: "MANUTENÇÕES",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="tools" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="stock"
        options={{
          title: "ESTOQUE",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="package" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          headerStyle: false,
          title: "",
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
