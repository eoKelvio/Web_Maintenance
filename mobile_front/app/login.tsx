import { View } from "react-native";
import { Link, router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { H1, Muted } from "~/components/ui/typography";

export default function LoginScreen() {
  return (
    <View className="h-full justify-center items-center bg-secondary/30">
      <View className="p-4 native:pb-24 max-w-md gap-3">
        <View className="gap-1">
          <H1 className="text-foreground text-center">Faça login</H1>
          <Muted className="text-base text-center">
            Insira seu email e senha
          </Muted>
        </View>

        <Input placeholder="Email" />
        <Input textContentType="password" placeholder="Senha" />

        {/* Navigate to the main tabs upon successful login */}
        <Button
          className="mt-4"
          onPress={() => {
            router.push("/(tabs)");
          }}
        >
          <Text>Entrar</Text>
        </Button>

        <View className="flex-row items-center gap-3 mt-6">
          <View className="flex-1 h-px bg-muted" />
          <Muted>SE NÃO POSSUI CONTA</Muted>
          <View className="flex-1 h-px bg-muted" />
        </View>

        {/* Navigate to the registration screen */}
        <Button
          className="mt-4"
          onPress={() => {
            router.push("/register");
          }}
        >
          <Text>Cadastrar</Text>
        </Button>

        <View className="mt-4">
          <Muted className="text-center">
            Ao criar uma conta, você concorda com nossos{" "}
            <Link href="/login">
              <Muted className="underline">Termos de Serviço</Muted>
            </Link>{" "}
            e nossa{" "}
            <Link href="/login">
              <Muted className="underline">Política de Privacidade</Muted>
            </Link>
          </Muted>
        </View>
      </View>
    </View>
  );
}
