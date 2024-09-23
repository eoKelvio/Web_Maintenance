import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { items } from "~/data/mock_items";
import { finishMaintenance, user } from "~/data/mock_user";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { router } from "expo-router";

interface Field {
  selectedItem: string;
  quantity: string;
}

export default function CloseMaintenanceScreen() {
  const [fields, setFields] = useState<Field[]>([
    { selectedItem: "", quantity: "" },
  ]);
  const [comment, setComment] = useState<string>("");

  // Add a new field for selecting materials and quantity
  const handleAddField = () => {
    setFields([...fields, { selectedItem: "", quantity: "" }]);
  };

  // Remove a field by index if there are multiple fields
  const handleRemoveField = (index: number) => {
    if (fields.length > 1) {
      const newFields = fields.filter((_, i) => i !== index);
      setFields(newFields);
    }
  };

  // Update the value of a specific field
  const handleFieldChange = (
    index: number,
    field: keyof Field,
    value: string
  ) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };

  // Finish maintenance process and navigate
  const handleFinishMaintenance = async () => {
    try {
      await finishMaintenance(user);
      router.push("/(tabs)/maintenance");
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <View className="p-4 flex-1">
      <ScrollView
        contentContainerStyle={{ gap: 3 }}
        showsVerticalScrollIndicator={false}
      >
        {fields.map((field, index) => (
          <View key={index} className="flex-row gap-2 items-center">
            <View className="flex-1">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Selecione"
                  />
                </SelectTrigger>
                <SelectContent className="w-min p-0 m-0">
                  <SelectGroup>
                    <SelectLabel>Materiais</SelectLabel>
                    {items.map((item) => (
                      <SelectItem
                        key={item.id}
                        label={item.name}
                        value={item.name}
                      >
                        {item.name} ({item.currentStock} disponíveis)
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </View>
            <View className="flex-1">
              <Input
                className="w-full text-right px-4"
                placeholder="Quantidade"
                keyboardType="numeric"
                maxLength={3}
                value={field.quantity}
                onChangeText={(value) =>
                  handleFieldChange(index, "quantity", value)
                }
              />
            </View>
            <Button
              onPress={() => handleRemoveField(index)}
              variant={"default"}
              className="flex-none"
              size={"icon"}
            >
              <Text className="text-primary-foreground">X</Text>
            </Button>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row justify-between w-full gap-3">
        <Button
          onPress={handleAddField}
          variant={"outline"}
          className="flex-1"
          size={"sm"}
        >
          <Text className="text-primary">Adicionar Material</Text>
        </Button>
      </View>
      <Textarea
        placeholder="Escreva um comentário..."
        value={comment}
        onChangeText={setComment}
        aria-labelledby="textareaLabel"
        className="w-full my-4"
      />
      <View className="w-1/2 self-center py-2">
        <Button onPress={handleFinishMaintenance}>
          <Text className="text-primary-foreground font-semibold text-lg">
            Confirmar
          </Text>
        </Button>
      </View>
    </View>
  );
}
