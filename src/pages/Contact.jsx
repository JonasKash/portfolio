import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, MessageSquare, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agentType: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const agentTypes = [
    { id: "integration", name: "Integração de Sistemas" },
    { id: "automation", name: "Automação de Processos" },
    { id: "monitoring", name: "Monitoramento de Dados" },
    { id: "communication", name: "Comunicação Automática" },
    { id: "custom", name: "Solução Personalizada" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        agentType: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-[#9442fe]/20 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-64 bg-[#00f0ff]/20 blur-[120px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vamos Conectar o <span className="gradient-text">Futuro</span> do Seu Negócio
            </h1>
            <p className="text-xl text-gray-300">
              Conte sua ideia, desafio ou sonho. Nossa equipe está pronta para criar soluções que vão além do esperado.<br />
              Fale com quem entende de automação visionária.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <div className="max-w-md">
                <h2 className="text-3xl font-bold mb-8">
                  Vamos conversar sobre <span className="gradient-text">automação</span>
                </h2>
                
                <div className="space-y-6">
                  <ContactInfoItem 
                    icon={<Mail className="w-6 h-6 text-[#00f0ff]" />}
                    title="Email"
                    content="contato@ugaritdigital.com"
                  />
                  <ContactInfoItem 
                    icon={<Phone className="w-6 h-6 text-[#00f0ff]" />}
                    title="Telefone"
                    content="+55 11 99999-9999"
                  />
                  <ContactInfoItem 
                    icon={<MapPin className="w-6 h-6 text-[#00f0ff]" />}
                    title="Endereço"
                    content="São Paulo, SP - Brasil"
                  />
                  <ContactInfoItem 
                    icon={<MessageSquare className="w-6 h-6 text-[#00f0ff]" />}
                    title="Horário de Atendimento"
                    content="Segunda à Sexta, 9h às 18h"
                  />
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">Siga-nos</h3>
                  <div className="flex space-x-4">
                    <SocialIcon name="linkedin" />
                    <SocialIcon name="twitter" />
                    <SocialIcon name="instagram" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-xl p-10 h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00f0ff]/20 to-[#9442fe]/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-[#00f0ff]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mensagem Enviada!</h3>
                  <p className="text-gray-300 mb-8">
                    Obrigado por entrar em contato conosco. Nossa equipe responderá em breve.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3 bg-gradient-to-r from-[#00f0ff]/20 to-[#9442fe]/20 border border-[#00f0ff]/30 text-white font-medium rounded-full"
                  >
                    Enviar outra mensagem
                  </motion.button>
                </motion.div>
              ) : (
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Quero Inovar com a Ugarit</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="Nome"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                      />
                      <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="Telefone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                      />
                      <FormInput
                        label="Assunto"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={errors.subject}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Tipo de Agente</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {agentTypes.map(type => (
                          <label 
                            key={type.id} 
                            className={`
                              px-4 py-3 rounded-lg border cursor-pointer transition-all flex items-center
                              ${formData.agentType === type.id 
                                ? "border-[#00f0ff] bg-[#00f0ff]/10" 
                                : "border-gray-700 bg-gray-800/30 hover:border-gray-600"}
                            `}
                          >
                            <input
                              type="radio"
                              name="agentType"
                              value={type.id}
                              checked={formData.agentType === type.id}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div 
                              className={`w-4 h-4 rounded-full mr-3 border ${
                                formData.agentType === type.id 
                                  ? "border-[#00f0ff] bg-[#00f0ff]" 
                                  : "border-gray-500"
                              }`}
                            />
                            <span className="text-sm">{type.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">
                        Sua Mensagem <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 bg-gray-800/50 border ${
                          errors.message ? "border-red-500" : "border-gray-700"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/50 focus:border-transparent transition-all resize-none`}
                        placeholder="Descreva seu desafio, ideia ou objetivo. Vamos juntos além do comum!"
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black font-bold rounded-lg flex items-center justify-center disabled:opacity-70"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin mr-3 h-5 w-5 border-2 border-black border-t-transparent rounded-full"></div>
                          Enviando para o Futuro...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Quero Inovar com a Ugarit
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="border border-gray-800 rounded-xl overflow-hidden h-96">
            {/* Placeholder for map */}
            <div className="w-full h-full bg-gradient-to-r from-gray-900 to-black flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#00f0ff]/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Ugarit Digital</h3>
                <p className="text-gray-400">São Paulo, SP - Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper Components
const ContactInfoItem = ({ icon, title, content }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00f0ff]/10 to-[#9442fe]/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-gray-400">{content}</p>
      </div>
    </div>
  );
};

const SocialIcon = ({ name }) => {
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
};

const FormInput = ({ label, name, type = "text", value, onChange, error, required = false }) => {
  return (
    <div>
      <label className="block text-white mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gray-800/50 border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/50 focus:border-transparent transition-all`}
      />
      {error && (
        <p className="mt-1 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}; 