import React from "react";
import { View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const GITHUB_AVATAR_URI =
  "https://img.freepik.com/fotos-premium/trabalhador-com-capacete-de-trabalho_807028-422.jpg";

export default function SettingsScreen() {
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }
  return (
    <View className="h-full w-full justify-center items-center p-6 bg-secondary/30">
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader className="items-center">
          <Avatar alt="Rick Sanchez's Avatar" className="w-24 h-24">
            <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
          </Avatar>
          <View className="p-3" />
          <CardTitle className="pb-2 text-center">Alexandre Reame</CardTitle>
          <View className="flex-row">
            <Tooltip delayDuration={150}>
              <TooltipTrigger className="px-2 pb-0.5 active:opacity-50">
                <CardDescription className="text-base font-semibold">
                  Mecânico IV
                </CardDescription>
              </TooltipTrigger>
              <TooltipContent className="py-2 px-4 shadow">
                <Text className="native:text-lg">Freelance</Text>
              </TooltipContent>
            </Tooltip>
          </View>
        </CardHeader>
        <CardContent>
          <View className="flex-row justify-around gap-3">
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">Equipe</Text>
              <Text className=" font-semibold">Alpha</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">Setor</Text>
              <Text className=" font-semibold">Manutenção</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">PIS</Text>
              <Text className=" font-semibold">10837592017</Text>
            </View>
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <View className="flex-row items-center overflow-hidden"></View>
        </CardFooter>
      </Card>
    </View>
  );
}
