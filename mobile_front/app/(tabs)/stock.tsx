import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { stockedItems } from "~/data/mock_items";
import { useColorScheme } from "~/lib/useColorScheme";

export default function StockScreen() {
  const { isDarkColorScheme } = useColorScheme();

  // Get color based on item status and color scheme
  const getStatusColor = (status: string) => {
    if (status === "Normal") {
      return isDarkColorScheme ? "lightgreen" : "green";
    } else if (status === "Abaixo") {
      return isDarkColorScheme ? "lightcoral" : "red";
    } else {
      return "white";
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-3 p-3"
      className="bg-secondary/30 gap-10"
    >
      {stockedItems.map((item) => (
        <Card key={item.id} className="bg-secondary/30 -bg-card">
          <CardHeader className="flex-row justify-between">
            <CardTitle>{item.name}</CardTitle>
            <Text style={{ color: getStatusColor(item.status) }}>
              {item.status}
            </Text>
          </CardHeader>
          <CardContent>
            <View className="justify-between flex-row">
              <Text>Quantidade Atual: </Text>
              <Text className="font-bold">
                {item.currentStock + " " + item.unit}
              </Text>
            </View>
            <View className="justify-between flex-row">
              <Text>Quantidade Mínima: </Text>
              <Text className="font-bold">
                {item.minimumStock + " " + item.unit}
              </Text>
            </View>
          </CardContent>
        </Card>
      ))}
    </ScrollView>
  );
}
