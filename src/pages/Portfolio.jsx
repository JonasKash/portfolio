import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, X, ChevronRight, ChevronLeft } from "lucide-react";
import ChatInterface from "../components/ChatInterface";

export default function Portfolio() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [filter, setFilter] = useState("all");
  // Removidos estados não utilizados relacionados ao formulário antigo
  // const [agentResponse, setAgentResponse] = useState(null);
  // const [agentLoading, setAgentLoading] = useState(false);
  // const [agentError, setAgentError] = useState(null);
  // const [imageFile, setImageFile] = useState(null);
  // const [isRecording, setIsRecording] = useState(false);
  // const [recordedAudio, setRecordedAudio] = useState(null); // Blob
  // const [audioUrl, setAudioUrl] = useState(null);
  // const mediaRecorderRef = useRef(null);
  // const audioChunksRef = useRef([]);
  
  // Estado para controlar a exibição do chat
  const [showChat, setShowChat] = useState(false);

  const categories = [
    { id: "all", name: "Todos" },
    { id: "integration", name: "Integração" },
    { id: "automation", name: "Automação" },
    { id: "monitoring", name: "Monitoramento" },
    { id: "communication", name: "Comunicação" }
  ];

  // Array de agentes com webhookUrl e initialMessage individuais
  const agents = [
    {
      id: 1,
      title: "Monitoramento de Transações",
      category: "monitoring",
      description: "Monitora transações em tempo real e envia alertas para comportamentos suspeitos, permitindo a identificação imediata de fraudes e anomalias.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      longDescription: "Este agente utiliza algoritmos avançados para monitorar transações em tempo real, identificando padrões suspeitos e enviando alertas instantâneos. Ideal para instituições financeiras, e-commerces e qualquer empresa que processe transações online, ele oferece uma camada adicional de segurança para proteger seus negócios e clientes contra fraudes.",
      features: [
        "Monitoramento em tempo real de todas as transações",
        "Algoritmos de detecção de anomalias baseados em ML",
        "Alertas instantâneos por e-mail, SMS ou Slack",
        "Dashboard de visualização de atividades suspeitas",
        "Integração com sistemas antifraude existentes"
      ],
      workflow: [
        "Captura de dados da transação",
        "Análise de padrões e comportamentos",
        "Comparação com base histórica",
        "Classificação de risco",
        "Envio de alertas"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/atendimento", // Exemplo
      initialMessage: "Olá! Sou o agente de Monitoramento de Transações. Como posso ajudar a proteger suas operações hoje?"
    },
    {
      id: 2,
      title: "Atendimento Automático",
      category: "communication",
      description: "Responde a solicitações de clientes 24/7 integrando-se a canais de comunicação como e-mail, WhatsApp e Telegram.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      longDescription: "O Agente de Atendimento Automático unifica todos os seus canais de comunicação em uma única plataforma, proporcionando respostas instantâneas a consultas frequentes dos clientes. Ele classifica as mensagens, responde automaticamente às perguntas comuns e escala para humanos quando necessário.",
      features: [
        "Integração com WhatsApp, Telegram, E-mail e Messenger",
        "Respostas automáticas para perguntas frequentes",
        "Encaminhamento inteligente para atendentes humanos",
        "Histórico completo de conversas",
        "Análise de sentimento das mensagens recebidas"
      ],
      workflow: [
        "Recebimento da mensagem do cliente",
        "Classificação e análise de intenção",
        "Resposta automática ou encaminhamento",
        "Registro do atendimento",
        "Análise de satisfação"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/atendimento", // Exemplo
      initialMessage: "Olá! Sou o agente de Atendimento Automático. Em que posso te ajudar agora?"
    },
    {
      id: 3,
      title: "Integração com Firebase",
      category: "integration",
      description: "Sincroniza dados entre Firebase e outras plataformas em tempo real, mantendo sistemas atualizados e consistentes.",
      image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      longDescription: "Este agente cria uma ponte robusta entre o Firebase e qualquer outro sistema que sua empresa utilize. Sincroniza dados em tempo real, garante consistência e oferece um fluxo bidirecional de informações, eliminando a necessidade de processos manuais de exportação e importação.",
      features: [
        "Sincronização bidirecional em tempo real",
        "Mapeamento flexível de campos de dados",
        "Transformação e enriquecimento de dados",
        "Tratamento de erros e tentativas automáticas",
        "Logs detalhados para auditoria e monitoramento"
      ],
      workflow: [
        "Escuta de eventos no Firestore/Realtime Database",
        "Extração e transformação dos dados",
        "Envio para o sistema de destino",
        "Confirmação de sincronização",
        "Geração de relatórios de status"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/firebase", // Exemplo
      initialMessage: "Olá! Sou o agente de Integração com Firebase. Precisa sincronizar dados? Me diga como posso ajudar."
    },
    {
      id: 4,
      title: "Automação de Marketing",
      category: "automation",
      description: "Automatiza campanhas de marketing em múltiplos canais, segmentando leads e personalizando mensagens.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      longDescription: "O Agente de Automação de Marketing conecta suas ferramentas de CRM, email marketing e redes sociais, criando fluxos automatizados para nutrir leads, programar postagens e analisar resultados. Economize tempo e potencialize seus resultados de marketing com automação inteligente.",
      features: [
        "Segmentação avançada de público",
        "Sequências de emails personalizados",
        "Postagens automáticas em redes sociais",
        "A/B testing automático",
        "Relatórios de performance unificados"
      ],
      workflow: [
        "Captura e qualificação de leads",
        "Segmentação baseada em comportamento",
        "Envio de conteúdo personalizado",
        "Monitoramento de engajamento",
        "Otimização de campanhas"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/marketing", // Exemplo
      initialMessage: "Olá! Sou o agente de Automação de Marketing. Pronto para otimizar suas campanhas? Me conte seus objetivos!"
    },
    {
      id: 5,
      title: "Sincronização de CRM",
      category: "integration",
      description: "Mantém múltiplos CRMs sincronizados, garantindo consistência de dados de clientes e vendas em toda a empresa.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      longDescription: "Desenvolvido para empresas que utilizam múltiplos CRMs ou precisam integrar seu CRM com outros sistemas, este agente garante que as informações de clientes, leads e vendas estejam sempre atualizadas em todas as plataformas, eliminando silos de informação.",
      features: [
        "Sincronização bidirecional entre CRMs populares",
        "Mapeamento personalizado de campos e entidades",
        "Resolução inteligente de conflitos",
        "Filtros para sincronização seletiva",
        "Histórico completo de sincronizações"
      ],
      workflow: [
        "Detecção de alterações nos CRMs",
        "Comparação e resolução de conflitos",
        "Transformação de dados quando necessário",
        "Atualização em sistemas de destino",
        "Confirmação e log de sincronização"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/duvidas", // Exemplo
      initialMessage: "Olá! Sou o agente de Sincronização de CRM. Vamos manter seus dados consistentes? Me diga quais sistemas você usa."
    },
    {
      id: 99,
      title: "Agente MAX (n8n)",
      category: "automation",
      description: "Agente inteligente integrado ao n8n para automações clínicas. Envie uma mensagem de teste e veja a resposta em tempo real.",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
      longDescription: "O Agente MAX é um agente inteligente conectado ao n8n, pronto para receber comandos, mensagens e executar automações clínicas. Teste enviando uma mensagem pelo formulário abaixo e veja a resposta do agente em tempo real.",
      features: [
        "Recebe mensagens do site via webhook",
        "Executa automações clínicas no n8n",
        "Retorna resposta personalizada",
        "Pronto para integração com sistemas de saúde",
        "Exemplo real de integração frontend + n8n"
      ],
      workflow: [
        "Usuário envia mensagem pelo site",
        "Mensagem é recebida pelo n8n via webhook",
        "n8n processa e executa automação",
        "Resposta é enviada de volta ao site"
      ],
      webhookUrl: "https://portfolio.n8n.ugaritdigital.com/webhook/sentimental", // Exemplo
      initialMessage: "Olá! Sou o Agente MAX, pronto para suas automações clínicas. O que você precisa automatizar hoje?"
    }
  ];

  const filteredAgents = filter === "all" 
    ? agents 
    : agents.filter(agent => agent.category === filter);

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    setSelectedAgent(null);
    setShowChat(false);
  };

  // Função para abrir o chat
  const handleOpenChat = () => {
    setShowChat(true);
  };

  // Funções auxiliares removidas (fileToBase64, blobToBase64, startRecording, stopRecording, acionarAgenteMax)
  // pois a lógica de chat agora está encapsulada em ChatInterface.jsx

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Agent Detail Modal */}
        <AnimatePresence>
          {selectedAgent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-start pt-10 pb-20 px-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl shadow-xl max-w-5xl w-full overflow-hidden"
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
              >
                {/* Exibir o chat quando showChat for true */}
                {showChat ? (
                  <div className="h-[80vh]">
                    <ChatInterface 
                      agentName={selectedAgent.title}
                      agentAvatar={selectedAgent.image}
                      onClose={() => setShowChat(false)} // Passa a função para fechar o chat
                      webhookUrl={selectedAgent.webhookUrl} // Passa a URL do webhook do agente selecionado
                      initialMessage={selectedAgent.initialMessage} // Passa a mensagem inicial do agente selecionado
                    />
                  </div>
                ) : (
                  <>
                    <div className="relative h-64 sm:h-96">
                      <img
                        src={selectedAgent.image}
                        alt={selectedAgent.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      <button
                        onClick={handleClose} // Botão X fecha o modal inteiro
                        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </div>

                    <div className="p-8">
                      <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                          <h2 className="text-3xl font-bold">{selectedAgent.title}</h2>
                          <div className="mt-2">
                            <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300">
                              {categories.find(c => c.id === selectedAgent.category)?.name}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xl font-semibold mb-4 gradient-text">Sobre o Agente</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">{selectedAgent.longDescription}</p>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold mb-4 gradient-text">Funcionalidades</h3>
                            <ul className="space-y-2">
                              {selectedAgent.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="w-5 h-5 mr-3 mt-1 flex-shrink-0">
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00f0ff] to-[#9442fe]"></div>
                                  </div>
                                  <span className="text-gray-300 text-lg">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold mb-4 gradient-text">Fluxo de Trabalho</h3>
                            <div className="relative pl-8">
                              {selectedAgent.workflow.map((step, index) => (
                                <div key={index} className="relative pb-8">
                                  {index !== selectedAgent.workflow.length - 1 && (
                                    <span className="absolute top-5 left-[11px] -ml-px h-full w-0.5 bg-gradient-to-b from-[#00f0ff] to-[#9442fe]" aria-hidden="true"></span>
                                  )}
                                  <div className="relative flex items-start space-x-3">
                                    <div className="relative">
                                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#9442fe] flex items-center justify-center ring-4 ring-gray-900">
                                        <span className="text-black font-bold">{index + 1}</span>
                                      </div>
                                    </div>
                                    <div className="min-w-0 flex-1 py-1.5">
                                      <div className="text-lg text-gray-300">
                                        {step}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Botão para abrir o chat */}
                          <div className="flex justify-center pt-8">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleOpenChat} // Botão agora abre o chat
                              className="px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black font-bold rounded-full text-lg flex items-center space-x-2 shadow-lg shadow-[#00f0ff]/30 hover:shadow-[#9442fe]/40 transition-shadow"
                            >
                              <span>Solicitar Este Agente</span>
                              <Plus className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Portfolio Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center mb-4 gradient-text">Nossos Agentes</h1>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Explore nossa coleção de agentes inteligentes projetados para automatizar e otimizar diversas áreas do seu negócio.
          </p>

          {/* Filters */}
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base transition-colors ${
                  filter === category.id
                    ? "bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black font-semibold"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Agent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent) => (
              <motion.div
                key={agent.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#00f0ff]/20 transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-48">
                  <img
                    src={agent.image}
                    alt={agent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{agent.title}</h3>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-800 text-gray-400 self-start mb-3">
                    {categories.find(c => c.id === agent.category)?.name}
                  </span>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{agent.description}</p>
                  <button
                    onClick={() => handleAgentClick(agent)}
                    className="mt-auto w-full px-4 py-2 bg-gradient-to-r from-[#00f0ff]/80 to-[#9442fe]/80 text-black font-semibold rounded-lg hover:from-[#00f0ff] hover:to-[#9442fe] transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Ver Detalhes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

