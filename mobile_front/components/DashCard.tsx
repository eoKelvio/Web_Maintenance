import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

type Card = {
  number: number;
  content: string;
  icon: keyof typeof Ionicons.glyphMap;
  className: string;
  onPress: () => void;
};

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
        <Ionicons
          name={icon}
          color={useColorScheme().colorScheme === "dark" ? "white" : "white"}
          size={24}
        />
      </View>
      <CardDescription className="self-center text-white">
        <Text>{content}</Text>
      </CardDescription>
    </Card>
  );
}
