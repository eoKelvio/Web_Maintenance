import { useState } from "react";
import { View, Alert } from "react-native";
import { Link, router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { H1, Muted } from "~/components/ui/typography";
import { createUser } from "~/lib/api/user";

export default function RegisterScreen() {
  // Estados para os campos de entrada
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !username || !password || !role) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const newUser = {
      name,
      username,
      password,
      role,
      team_id: null,
    };

    try {
      await createUser(newUser);
      alert("Sucesso - Usuário registrado com sucesso!");
      router.push("/(tabs)"); // Redireciona após o registro
    } catch (error) {
      alert("Erro - Não foi possível registrar o usuário.");
    }
  };

  return (
    <View className="h-full justify-center items-center bg-secondary/30">
      <View className="p-4 native:ph-12 max-w-md gap-3">
        <View className="gap-1">
          <H1 className="text-foreground text-center">Crie sua conta</H1>
          <Muted className="text-base text-center">
            Insira seu nome, email e senha
          </Muted>
        </View>
        <Input placeholder="Nome" value={name} onChangeText={setName} />
        <Input
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
        />
        <Input placeholder="Função" value={role} onChangeText={setRole} />
        <Input
          textContentType="password"
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button className="mt-4" onPress={handleRegister}>
          <Text>Registrar</Text>
        </Button>
        <View className="flex-row items-center gap-3 mt-6">
          <View className="flex-1 h-px bg-muted" />
          <Muted>JÁ POSSUI CONTA?</Muted>
          <View className="flex-1 h-px bg-muted" />
        </View>
        <Button
          className="mt-4"
          onPress={() => {
            router.push("/login");
          }}
        >
          <Text>Entrar</Text>
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
