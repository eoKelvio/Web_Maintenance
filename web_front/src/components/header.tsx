import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"


export default function Header(){
  return (
    <header className="p-4 shadow-header">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-gray-500 text-2xl">Meu Site</h1>
        <nav>
          {/* <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-gray-500 hover:underline">Home</a>
            </li>
            <li>
              <a href="/about" className="text-gray-500 hover:underline">Sobre</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-500 hover:underline">Contato</a>
            </li>
          </ul> */}
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
          </Menubar>
        </nav>
      </div>
    </header>
  );
};


