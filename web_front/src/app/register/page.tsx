"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// Validação do formulário com Zod
const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Por favor, insira um endereço de email válido." }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  // Hook do Next.js para navegação programática
  const router = useRouter();

  // Configuração do React Hook Form com o resolver do Zod
  const form = useForm({
    resolver: zodResolver(registerSchema), // Validação com o schema Zod
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Função que será chamada ao enviar o formulário
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log("Valores do registro:", values);
    // Aqui você pode integrar a chamada para sua API de registro (ex: Axios, Fetch)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Título da página */}
      <h1 className="text-2xl font-bold mb-4">Registrar-se</h1>

      {/* Formulário de Registro */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)} // Envia os dados ao chamar onSubmit
          className="space-y-6 w-full max-w-sm"
        >
          {/* Campo de Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="seuemail@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Senha */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Confirmar Senha */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botão para Enviar o Formulário */}
          <Button type="submit" className="w-full">
            Registrar
          </Button>

          {/* Botão de Link para a página de login */}
          <Button
            type="button"
            variant={"link"}
            className="w-full"
            onClick={() => {
              router.push("/login"); // Navega para a página de login
            }}
          >
            Já tem uma conta? Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
