"use client";

import React from "react";
import Image from "next/image";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Ocultar Header em páginas de autenticação
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Exemplo de estado de autenticação
  const isAuthenticated = false; // Altere para true se o usuário estiver logado

  if (isAuthPage) return null; // Não renderiza o header nas páginas de login/register

  return (
    <header className="p-4 shadow-header">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={"/image/logo-black.png"}
            width={192}
            height={192}
            className="dark:hidden"
            alt=""
          />
          <Image
            src={"/image/logo-white.png"}
            width={192}
            height={192}
            className="hidden dark:block"
            alt=""
          />
        </Link>

        {/* Menu */}
        <nav className="flex gap-4">
          <Menubar>
            <MenubarMenu>
              <Link href="/machines">
                <MenubarTrigger>Máquinas</MenubarTrigger>
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link href="/maintenance">
                <MenubarTrigger>Manutenções</MenubarTrigger>
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link href="/teams">
                <MenubarTrigger>Equipes</MenubarTrigger>
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link href="/stock">
                <MenubarTrigger>Estoque</MenubarTrigger>
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link href="/users">
                <MenubarTrigger>Usuários</MenubarTrigger>
              </Link>
            </MenubarMenu>
          </Menubar>
          <Menubar>
            <MenubarMenu>
              {isAuthenticated ? (
                <MenubarTrigger onClick={() => alert("Sair")}>
                  Sair
                </MenubarTrigger>
              ) : (
                <Link href="/login">
                  <MenubarTrigger>Entrar</MenubarTrigger>
                </Link>
              )}
            </MenubarMenu>
            <MenubarMenu>
              <ModeToggle />
            </MenubarMenu>
          </Menubar>
        </nav>
      </div>
    </header>
  );
}
