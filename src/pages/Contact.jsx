import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, MessageSquare, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nome_empresario: "",
    email: "",
    telefone: "",
    nome_empresa: "",
    redes_empresa: "",
    faturamento: "",
    segmento: "",
    text_desejo: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome_empresario.trim()) {
      newErrors.nome_empresario = "Nome do empresário é obrigatório";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.text_desejo.trim()) {
      newErrors.text_desejo = "Descreva seu desejo/necessidade";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setIsSuccess(false);
    const webhookUrl = "https://portfolio.n8n.ugaritdigital.com/webhook/form-page";
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          nome_empresario: "", email: "", telefone: "", nome_empresa: "",
          redes_empresa: "", faturamento: "", segmento: "", text_desejo: ""
        });
      } else {
        console.error("Webhook submission failed:", response.status, await response.text());
        alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Ocorreu um erro de conexão ao enviar o formulário. Verifique sua internet e tente novamente.");
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
                  <ContactInfoItem icon={<Mail className="w-6 h-6 text-[#00f0ff]" />} title="Email" content="contato@ugaritdigital.com" />
                  <ContactInfoItem icon={<Phone className="w-6 h-6 text-[#00f0ff]" />} title="Telefone" content="+55 11 99999-9999" />
                  <ContactInfoItem icon={<MapPin className="w-6 h-6 text-[#00f0ff]" />} title="Endereço" content="São Paulo, SP - Brasil" />
                  <ContactInfoItem icon={<MessageSquare className="w-6 h-6 text-[#00f0ff]" />} title="Horário de Atendimento" content="Segunda à Sexta, 9h às 18h" />
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
                  <p className="text-gray-300 mb-8">Obrigado por entrar em contato conosco. Nossa equipe responderá em breve.</p>
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
                    {/* Grid 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Nome do Empresário" name="nome_empresario" value={formData.nome_empresario} onChange={handleChange} error={errors.nome_empresario} required />
                      <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
                    </div>
                    {/* Grid 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} error={errors.telefone} />
                      <FormInput label="Nome da Empresa" name="nome_empresa" value={formData.nome_empresa} onChange={handleChange} error={errors.nome_empresa} />
                    </div>
                    {/* Grid 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Redes Sociais da Empresa" name="redes_empresa" value={formData.redes_empresa} onChange={handleChange} error={errors.redes_empresa} />
                      <FormInput label="Faturamento Anual (Aproximado)" name="faturamento" value={formData.faturamento} onChange={handleChange} error={errors.faturamento} />
                    </div>
                    {/* Field: Segmento */}
                    <div>
                      <FormInput label="Segmento de Atuação" name="segmento" value={formData.segmento} onChange={handleChange} error={errors.segmento} />
                    </div>
                    {/* Field: Text Desejo */}
                    <div>
                      <label className="block text-white mb-2">Descreva seu Desejo/Necessidade <span className="text-red-500">*</span></label>
                      <textarea
                        name="text_desejo"
                        value={formData.text_desejo}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 bg-gray-800/50 border ${errors.text_desejo ? "border-red-500" : "border-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/50 focus:border-transparent transition-all resize-none`}
                        placeholder="Descreva seu desafio, ideia ou objetivo. Vamos juntos além do comum!"
                      ></textarea>
                      {errors.text_desejo && <p className="mt-1 text-red-500 text-sm">{errors.text_desejo}</p>}
                    </div>
                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black font-bold rounded-lg flex items-center justify-center disabled:opacity-70"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <><div className="animate-spin mr-3 h-5 w-5 border-2 border-black border-t-transparent rounded-full"></div>Enviando para o Futuro...</>
                      ) : (
                        <><Send className="w-5 h-5 mr-2" />Quero Inovar com a Ugarit</>
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
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00f0ff]/10 to-[#9442fe]/10 flex items-center justify-center flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-gray-400">{content}</p>
      </div>
    </div>
  );
};

const SocialIcon = ({ name }) => {
  const icons = {
    linkedin: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>,
    twitter: <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.422.724-.665 1.56-.665 2.456 0 1.484.757 2.795 1.909 3.562-.703-.022-1.365-.215-1.948-.538v.051c0 2.072 1.474 3.8 3.421 4.194-.358.097-.736.148-1.13.148-.274 0-.54-.026-.796-.076.544 1.698 2.126 2.934 3.999 2.97-1.463 1.146-3.31 1.828-5.313 1.828-.344 0-.683-.02-1.016-.06 1.892 1.212 4.14 1.918 6.561 1.918 7.874 0 12.177-6.522 12.177-12.177 0-.185-.004-.368-.012-.55.836-.603 1.56-1.354 2.135-2.216z"/>,
    instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.358-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  };
  return (
    <a href={`https://${name}.com`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
      <span className="sr-only">{name}</span>
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {icons[name] || <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>}
      </svg>
    </a>
  );
};

const FormInput = ({ label, name, type = "text", value, onChange, error, required = false }) => {
  return (
    <div>
      <label className="block text-white mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gray-800/50 border ${error ? "border-red-500" : "border-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/50 focus:border-transparent transition-all`}
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};
