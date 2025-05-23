import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight, Zap } from "lucide-react";
import UgaritLogo from "../assets/UgaritLogo.svg";
import UgaritLogoImg from "../../Screenshot_2025-05-14_13.42.23-removebg-preview.png";

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 100]);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/50 backdrop-filter backdrop-blur-sm z-10"></div>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-grid-background-18161-large.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Hero Content */}
          <div className="container relative z-10 px-6 text-center">
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Automação Inteligente
                </motion.span>
                <motion.span
                  className="gradient-text block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  whileHover={{ scale: 1.05, textShadow: "0 0 16px #00f0ff" }}
                >
                  com n8n
                </motion.span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Agentes que transformam negócios e impulsionam resultados com integração e automação de ponta.
              </p>
            </div>

            <div className="flex flex-row items-center justify-center gap-6 sm:gap-10 mt-10 mb-2">
              <Link to={createPageUrl("Portfolio")}> 
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black font-bold rounded-full flex items-center space-x-2"
                >
                  <span>Ver Portfólio</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label="Rolar para baixo"
                onClick={scrollToAbout}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') scrollToAbout(); }}
              >
                <ChevronDown className="w-10 h-10 text-white/70" />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-white/30 backdrop-blur-md hover:bg-white/10 text-white font-medium rounded-full"
                onClick={scrollToAbout}
              >
                Saiba Mais
              </motion.button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section 
          ref={aboutRef}
          className="py-24 bg-gradient-to-b from-black to-gray-900 relative"
        >
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent"></div>
          
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Transformando o Imobiliário com <span className="gradient-text">Inovação</span> e <span className="gradient-text">Paixão</span>
              </h2>
              <p className="text-xl text-gray-300">
                Nascemos para desafiar o status quo. Unimos IA generativa, automação no-code e ousadia para criar uma nova linguagem digital no setor imobiliário.<br />
                Nossa missão? Ser a bússola digital dos líderes visionários, entregando automação sob medida, eficiência máxima e experiências que vão além do comum.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon="code"
                title="Integração Visionária"
                description="Conecte todos os seus sistemas e plataformas em fluxos inteligentes, sem limites para inovar."
                delay={0}
              />
              <FeatureCard 
                icon="zap"
                title="Automação Audaciosa"
                description="Agentes que aprendem, executam e surpreendem. Deixe a rotina para as máquinas e foque no que importa: crescer."
                delay={0.2}
              />
              <FeatureCard 
                icon="settings"
                title="Personalização Radical"
                description="Soluções sob medida, criadas para o seu desafio. Porque cada empresa visionária merece tecnologia à altura."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Featured Agents Section */}
        <section className="py-24 bg-[#080808] relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Agentes Visionários em <span className="gradient-text">Ação</span>
              </h2>
              <p className="text-xl text-gray-300">
                Conheça as soluções que estão revolucionando o mercado imobiliário.<br />
                Monitoramento, atendimento, integração e automação — tudo com IA de verdade.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AgentCard
                title="Monitoramento de Transações"
                description="Monitora transações em tempo real e envia alertas para comportamentos suspeitos."
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                delay={0}
              />
              <AgentCard
                title="Atendimento Automático"
                description="Responde a solicitações de clientes 24/7 integrando-se a canais de comunicação."
                image="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
                delay={0.2}
              />
              <AgentCard
                title="Integração com Firebase"
                description="Sincroniza dados entre Firebase e outras plataformas em tempo real."
                image="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                delay={0.4}
              />
            </div>

            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to={createPageUrl("Portfolio")}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#00f0ff]/20 to-[#9442fe]/20 border border-[#00f0ff]/30 text-white font-medium rounded-full flex items-center mx-auto space-x-2"
                >
                  <span>Ver Portfólio Completo</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-5xl mx-auto bg-gradient-to-r from-[#111111] to-[#1a1a1a] p-12 rounded-2xl border border-gray-800 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#9442fe]/20 blur-[100px] rounded-full"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#00f0ff]/20 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Pronto para decolar?
                  </h2>
                  <p className="text-xl text-gray-300">
                    Fale com a Ugarit e transforme seu negócio com automação de outro nível.
                  </p>
                </div>
                <Link to={createPageUrl("Contact")}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black font-bold rounded-full whitespace-nowrap flex items-center space-x-2"
                  >
                    <span>Quero Inovar com a Ugarit</span>
                    <Zap className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

// Helper Components
const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="rounded-xl overflow-hidden bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-800 p-8 hover:border-gray-700 transition-all group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ y: -5 }}
    >
      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00f0ff]/20 to-[#9442fe]/20 flex items-center justify-center mb-6 group-hover:from-[#00f0ff]/30 group-hover:to-[#9442fe]/30 transition-all">
        <IconComponent name={icon} className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const AgentCard = ({ title, description, image, delay }) => {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden group h-96"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity">{description}</p>
        <Link to={createPageUrl("Portfolio")}> 
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-medium text-sm border border-white/30 flex items-center space-x-2"
          >
            <span>Ver em ação</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

const IconComponent = ({ name, className }) => {
  switch (name) {
    case 'zap':
      return <Zap className={className} />;
    case 'code':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'settings':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return null;
  }
}; 