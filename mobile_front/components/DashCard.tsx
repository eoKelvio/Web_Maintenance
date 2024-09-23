import { Card, CardDescription, CardTitle } from "~/components/ui/card"; // Importing card components
import { Text, View } from "react-native"; // Importing React Native components
import { Ionicons } from "@expo/vector-icons"; // Importing icon library

// Defining the type for the props
type Card = {
  number: number; // Number to display
  content: string; // Content description
  icon: keyof typeof Ionicons.glyphMap; // Icon name
  className: string; // Additional class names
  onPress: () => void; // Function to call on press
};

// Functional component
export function DashboardCard({
  number,
  content,
  icon,
  className,
  onPress,
}: Card) {
  return (
    <Card className={`p-2 px-4 h-28 ${className}`} onTouchEndCapture={onPress}>
      <View className="w-full flex-row justify-between flex-1 items-center">
        <CardTitle className="text-5xl text-white">{number}</CardTitle>
        <Ionicons name={icon} color="white" size={24} />
      </View>
      <CardDescription className="text-white self-center">
        <Text>{content}</Text>
      </CardDescription>
    </Card>
  );
}
