import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";

export default function NotFoundScreen() {
  return (
    <>
      <View className="h-full w-full justify-center bg-secondary/30">
        <Card className="w-full max-w-sm p-6 rounded-2xl self-center">
          <CardHeader className="items-center">
            <View className="p-3" />
            <CardTitle className="pb-2 text-center">Ooops</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="self-center">This screen doesn't exist.</Text>
          </CardContent>
          <CardFooter className="flex-col gap-3 pb-0">
            <Button variant={"outline"}>
              <Link href={".."}>
                <Text className="text-primary">Go back!</Text>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </View>
    </>
  );
}
