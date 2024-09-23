import React from 'react';

export default function Footer() {
  return (
    <footer className="p-1 shadow-footer">
      <div className="container mx-auto text-center dark:text-white mt-5">
        <p>&copy; {new Date().getFullYear()} Web Maintenance.</p>
        <div className="mt-4 flex justify-center space-x-4">
        </div>
      </div>
    </footer>
  );
};


