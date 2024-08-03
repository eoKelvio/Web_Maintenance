import React from 'react';

export default function Footer() {
  return (
    <footer className="p-1 shadow-footer">
      <div className="container mx-auto text-center dark:text-white">
        <p>&copy; {new Date().getFullYear()} Web Maintenance.</p>
        <div className="mt-4 flex justify-center space-x-4">
          {/* <a href="/privacy-policy" className="hover:underline">Política de Privacidade</a>
          <a href="/terms-of-service" className="hover:underline">Termos de Serviço</a> */}
        </div>
      </div>
    </footer>
  );
};


