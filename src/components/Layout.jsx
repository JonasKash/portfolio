import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
// Import specific icons from lucide-react
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    // Added relative positioning to the main container if needed for absolute children, though fixed positioning works independently.
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="w-full py-6 bg-black/80 backdrop-blur-md shadow-lg z-40 sticky top-0"> {/* Adjusted z-index if needed */}
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
            {/* Updated SocialIcon usage with correct names and URLs */}
            <SocialIcon name="linkedin" url="https://www.linkedin.com/company/ugarit-digital/" />
            <SocialIcon name="instagram" url="https://www.instagram.com/ugarit.digital/" />
            <SocialIcon name="whatsapp" url="https://wa.me/5516996235750" /> {/* Using provided number with country code */}
          </div>
          <p className="text-gray-500 text-sm">Ugarit Digital — Ousadia, Inovação e Resultados Visionários.<br/>© {new Date().getFullYear()} Ugarit Digital. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5516996235750" // Added country code 55
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-110"
      >
        {/* Using MessageCircle as WhatsApp icon from lucide-react */}
        <MessageCircle className="w-6 h-6 text-white" /> 
      </a>
    </div>
  );
}

// Navigation Link component (unchanged)
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

// Updated SocialIcon component to use specific icons and URL prop
function SocialIcon({ name, url }) {
  let IconComponent;
  let ariaLabel = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize for label

  switch (name) {
    case 'linkedin':
      IconComponent = Linkedin;
      break;
    case 'instagram':
      IconComponent = Instagram;
      break;
    case 'whatsapp':
      IconComponent = MessageCircle; // Using MessageCircle from lucide-react for WhatsApp
      ariaLabel = 'WhatsApp';
      break;
    default:
      // Render nothing if the name is not recognized
      return null; 
  }

  return (
    <a
      href={url} // Use the provided URL
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel} // Add aria-label for accessibility
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
    >
      {/* Render the specific icon component */}
      <IconComponent className="w-5 h-5 text-white" /> 
    </a>
  );
} 

