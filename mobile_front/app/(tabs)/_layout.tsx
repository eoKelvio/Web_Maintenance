import { Octicons, Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  return (
    <Tabs
      safeAreaInsets={{ bottom: Platform.OS === "ios" ? 35 : 10 }} // Adjust bottom padding for iOS
      screenOptions={{
        headerStyle: { height: 70 }, // Header style configuration
        headerTitleStyle: { fontWeight: 700, fontSize: 15 }, // Header title styling
        tabBarHideOnKeyboard: true, // Hide tab bar when keyboard is open
        tabBarShowLabel: false, // Don't show labels on tabs
        headerShown: true, // Show header
        headerShadowVisible: false, // Hide header shadow
        headerTitleAlign: "center", // Center header title
      }}
    >
      {/* Define tab screens */}
      <Tabs.Screen
        name="index"
        options={{
          title: "RECARO", // Screen title
          tabBarIcon: (
            { color } // Tab icon
          ) => <Octicons size={28} name="graph" color={color} />,
        }}
      />
      <Tabs.Screen
        name="machines"
        options={{
          title: "MÁQUINAS", // Screen title
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="apps" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="maintenance"
        options={{
          title: "MANUTENÇÕES", // Screen title
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="tools" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stock"
        options={{
          title: "ESTOQUE", // Screen title
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="package" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true, // Show header
          headerStyle: false, // No custom header style
          title: "", // No title
          headerRight: () => <ThemeToggle />, // Right header component for theme toggle
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.push("/login"); // Navigate to login on press
              }}
              className="pl-8"
            >
              <Ionicons
                name="log-out-outline"
                size={28}
                color={
                  useColorScheme().colorScheme === "dark" ? "white" : "black" // Dynamic color based on theme
                }
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="gear" color={color} /> // Settings tab icon
          ),
        }}
      />
    </Tabs>
  );
}
