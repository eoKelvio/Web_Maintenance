import { Link, router, Stack } from "expo-router"; // Import Link and Stack from expo-router for navigation
import { View } from "react-native"; // Import View from React Native
import { Button } from "~/components/ui/button"; // Import custom Button component
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"; // Import Card components
import { Text } from "~/components/ui/text"; // Import custom Text component

// Define the NotFoundScreen component
export default function NotFoundScreen() {
  return (
    <>
      <View className="h-full w-full justify-center bg-secondary/30">
        <Card className="w-full max-w-sm p-6 rounded-2xl self-center">
          <CardHeader className="items-center">
            <View className="p-3" />
            <CardTitle className="pb-2 text-center">Ooops</CardTitle>{" "}
          </CardHeader>
          <CardContent>
            <Text className="self-center">This screen doesn't exist.</Text>{" "}
          </CardContent>
          <CardFooter className="flex-col gap-3 pb-0">
            <Button
              variant={"outline"}
              onPress={() => {
                router.push("/");
              }}
            >
              <Text className="text-primary">Go back!</Text>{" "}
            </Button>
          </CardFooter>
        </Card>
      </View>
    </>
  );
}
