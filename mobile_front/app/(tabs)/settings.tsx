import React from "react";
import { View } from "react-native";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { user } from "~/data/mock_user";

const AVATAR_URI =
  "https://img.freepik.com/fotos-premium/trabalhador-com-capacete-de-trabalho_807028-422.jpg";

export default function SettingsScreen() {
  return (
    <View className="h-full w-full justify-center items-center p-6 bg-secondary/30">
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader className="items-center">
          <Avatar alt="Avatar" className="w-24 h-24">
            <AvatarImage source={{ uri: AVATAR_URI }} />
          </Avatar>
          <View className="p-3" />
          <CardTitle className="pb-2 text-center">{user.name}</CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              {user.role}
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent>
          <View className="flex-row justify-around gap-3">
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">Equipe</Text>
              <Text className=" font-semibold">{user.team}</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">Setor</Text>
              <Text className=" font-semibold">{user.sector}</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">PIS</Text>
              <Text className=" font-semibold">{user.pis}</Text>
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
