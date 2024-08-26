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
import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 shadow-header">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo for light mode */}
        <Image src={"/image/logo-black.png"} width={192} height={192} className="dark:hidden" alt={''}/>
        {/* Logo for dark mode */}
        <Image src={"/image/logo-white.png"} width={192} height={192} className="hidden dark:block" alt={''}/>
        
        <nav>
          <Menubar>
            <MenubarMenu>
              <Link href="/">
                <MenubarTrigger>DashBoard</MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
                <Link href="/machines">
                  <MenubarTrigger>Maquinas</MenubarTrigger>
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
              <Link href="/materials">
                <MenubarTrigger>Materiais</MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <Link href="/cost">
                <MenubarTrigger>Custo</MenubarTrigger>
              </Link>
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
