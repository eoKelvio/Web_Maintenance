import * as React from "react";
import { TextInput, View } from "react-native";
import { cn } from "~/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, textContentType, placeholderClassName, ...props }, ref) => {
  const [isSecret, setIsScecret] = React.useState(true);
  return (
    <View className="flex-row h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 file:border-0 file:bg-transparent web:focus-visible:outline-none web:focus-visible:ring-2 web:ring-offset-background web:focus-visible:ring-ring web:focus-visible:ring-offset-2">
      <TextInput
        ref={ref}
        className={cn(
          "flex-1 caret-gray-500 web:flex text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground file:font-medium ",
          props.editable === false && "opacity-50 web:cursor-not-allowed",
          className
        )}
        selectionColor={"gray"}
        secureTextEntry={textContentType === "password" ? isSecret : false}
        placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
        {...props}
      />
      {textContentType === "password" ? (
        <Ionicons
          name={isSecret ? "eye-off-outline" : "eye-outline"}
          onPress={() => {
            setIsScecret(!isSecret);
          }}
          size={24}
          color={useColorScheme().colorScheme === "dark" ? "white" : "black"}
          className="self-center"
        />
      ) : (
        ""
      )}
    </View>
  );
});

Input.displayName = "Input";

export { Input };
