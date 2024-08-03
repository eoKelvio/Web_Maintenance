import React from 'react';
import Image from 'next/image';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from './ui/mode-toggle';

export default function Header() {
  return (
    <header className="p-4 shadow-header bg-white bg-opacity-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo for light mode */}
        <Image src={"/image/logo-black.png"} width={192} height={192} className="dark:hidden" alt={''}/>
        {/* Logo for dark mode */}
        <Image src={"/image/logo-white.png"} width={192} height={192} className="hidden dark:block" alt={''}/>
        
        <nav>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>DashBoard</MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Maquinas</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Consultar</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cadastrar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Manutenções</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Consultar</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Abrir chamado</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Equipes</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Consultar</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cadastrar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Materiais</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Consultar</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cadastrar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Custo</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Consultar</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Registrar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <ModeToggle />
            </MenubarMenu>
          </Menubar>
        </nav>
      </div>
    </header>
  );
};
