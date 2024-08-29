import { Button, Text, TextInput, View } from "react-native";
import { styled } from "nativewind"

const StyledView = styled(View)

function HomeScreen(){
  return(
    <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-x1 mb-2">Name:</Text>
    <TextInput className="border border-gray-300 p-3 mb-5 rounded" placeholder="Enter your name"/>
    <Text className="text-x1 mb-2">Email:</Text> 
    <TextInput className="border border-gray-300 p-3 mb-5 rounded" placeholder="Enter your email" />
    <Button title="Submit"/>
  </View>
  )
}

export default function Index() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <Text className="text-x1 mb-2">Name:</Text>
      <TextInput className="border border-gray-300 p-3 mb-5 rounded" placeholder="Enter your name"/>
      <Text className="text-x1 mb-2">Email:</Text> 
      <TextInput className="border border-gray-300 p-3 mb-5 rounded" placeholder="Enter your email" />
      <Button title="Submit"/>
    </StyledView>
  );
}
