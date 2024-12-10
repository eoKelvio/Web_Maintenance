import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware para proteger rotas e permitir apenas o acesso ao login e registro se não autenticado
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isLoginPage = url.pathname === "/login"; // Verifica se a página atual é /login
  const isRegisterPage = url.pathname === "/register"; // Verifica se a página atual é /register
  const isAuthenticated = true; // Substitua por sua lógica de autenticação real

  // Se o usuário não estiver autenticado e tentar acessar qualquer página que não seja login ou registro
  if (!isAuthenticated && !isLoginPage && !isRegisterPage) {
    // Redireciona para a página de login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Permite a navegação se o usuário estiver autenticado ou se for na página de login ou registro
  return NextResponse.next();
}

// Define em quais páginas o middleware será executado
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/machines",
    "/maintenance",
    "/teams",
    "/stock",
  ], // Você pode adicionar mais páginas aqui conforme necessário
};
