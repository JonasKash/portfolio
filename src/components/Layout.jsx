import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function Layout({ children }) {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="w-full py-6 bg-black/80 backdrop-blur-md shadow-lg z-50 sticky top-0">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to={createPageUrl("Home")} className="text-2xl font-bold gradient-text">
            Ugarit <span className="text-white">Digital</span>
          </Link>
          <nav className="flex items-center space-x-8">
            <NavLink href="/" label="Início" currentPage={currentPage} />
            <NavLink href="/portfolio" label="Portfólio" currentPage={currentPage} />
            <NavLink href="/contact" label="Contato" currentPage={currentPage} />
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      {/* Footer */}
      <footer className="bg-black/70 backdrop-blur-md py-10 border-t border-gray-800 mt-10">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-2 gradient-text">Ugarit Digital</div>
          <p className="text-gray-400 mb-4">Automação Inteligente, Resultados Visionários.</p>
          <div className="flex justify-center space-x-4 mb-4">
            <SocialIcon name="linkedin" />
            <SocialIcon name="twitter" />
            <SocialIcon name="instagram" />
          </div>
          <p className="text-gray-500 text-sm">Ugarit Digital — Ousadia, Inovação e Resultados Visionários.<br/>© {new Date().getFullYear()} Ugarit Digital. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, label, currentPage }) {
  const isActive =
    (href === "/" && currentPage === "/") ||
    (href !== "/" && currentPage.startsWith(href));
  return (
    <Link
      to={href}
      className={`font-medium transition-colors px-2 py-1 rounded ${
        isActive ? "text-white bg-gradient-to-r from-[#00f0ff]/20 to-[#9442fe]/20" : "text-gray-300 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function SocialIcon({ name }) {
  return (
    <a
      href={`https://${name}.com`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
    >
      <span className="sr-only">{name}</span>
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10z" clipRule="evenodd" />
      </svg>
    </a>
  );
} 