import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, X, ChevronRight, ChevronLeft } from "lucide-react";
import ChatInterface from "../components/ChatInterface";

export default function Portfolio() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [filter, setFilter] = useState("all");
  const [agentResponse, setAgentResponse] = useState(null);
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  // Áudio gravado
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null); // Blob
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  // Estado para controlar a exibição do chat
  const [showChat, setShowChat] = useState(false);

  const categories = [
    { id: "all", name: "Todos" },
    { id: "integration", name: "Integração" },
    { id: "automation", name: "Automação" },
    { id: "monitoring", name: "Monitoramento" },
    { id: "communication", name: "Comunicação" }
  ];

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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    },
    {
      id: 6,
      title: "Automação de Backups",
      category: "automation",
      description: "Automatiza backups de bancos de dados, sites e sistemas, garantindo a segurança dos dados com verificação e notificações.",
      image: "https://images.unsplash.com/photo-1560732488-7b5f5d8061c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      longDescription: "Proteja seus dados críticos com um sistema robusto de backups automatizados. Este agente gerencia todo o processo, desde a programação até a verificação da integridade dos backups, armazenamento em múltiplos locais e notificações detalhadas de status.",
      features: [
        "Backups programados para vários sistemas",
        "Verificação automática de integridade",
        "Armazenamento em múltiplos destinos (local, nuvem)",
        "Retenção configurável e rotação de backups",
        "Notificações detalhadas por email ou Slack"
      ],
      workflow: [
        "Programação de backups baseada em cronograma",
        "Execução do backup com verificações",
        "Compressão e criptografia dos dados",
        "Envio para destinos de armazenamento",
        "Relatório de status e alertas"
      ]
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
      ]
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

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Gravação de áudio
  const startRecording = async () => {
    setAgentError(null);
    setRecordedAudio(null);
    setAudioUrl(null);
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedAudio(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setAgentError('Permissão de microfone negada ou não suportada.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  async function acionarAgenteMax(payload = { mensagem: "Teste" }) {
    setAgentLoading(true);
    setAgentError(null);
    setAgentResponse(null);
    try {
      console.log('[DEBUG] Enviando para webhook:', payload);
      const res = await fetch("https://portfolio.n8n.ugaritdigital.com/webhook/atendimento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log('[DEBUG] Resposta recebida do webhook:', res);
      const data = await res.json();
      setAgentResponse(data);
    } catch (err) {
      setAgentError("Erro ao acionar agente. Tente novamente.");
      console.error('[DEBUG] Erro ao enviar para webhook:', err);
    } finally {
      setAgentLoading(false);
    }
  }

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
                      onClose={() => setShowChat(false)}
                      webhookUrl="https://portfolio.n8n.ugaritdigital.com/webhook/atendimento"
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
                        onClick={handleClose}
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
                                <li key={index} className="flex items-start space-x-3">
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#9442fe] flex-shrink-0 mt-1"></div>
                                  <span className="text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold mb-4 gradient-text">Fluxo de Trabalho</h3>
                            <div className="relative">
                              <div className="absolute top-0 bottom-0 left-[18px] w-0.5 bg-gradient-to-b from-[#00f0ff] to-[#9442fe]"></div>
                              <ul className="space-y-6">
                                {selectedAgent.workflow.map((step, index) => (
                                  <li key={index} className="flex items-center space-x-4">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#9442fe] flex items-center justify-center text-black font-bold z-10">
                                      {index + 1}
                                    </div>
                                    <div className="bg-gray-800/50 rounded-lg px-4 py-3 flex-grow">
                                      <span className="text-gray-200">{step}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="flex justify-center mt-10 gap-4 flex-col items-center">
                            {/* Botão modificado para abrir o chat */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleOpenChat}
                              className="px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black font-bold rounded-full flex items-center space-x-2"
                            >
                              <span>Solicitar Este Agente</span>
                              <Plus className="w-5 h-5" />
                            </motion.button>
                            
                            {selectedAgent?.id === 99 && (
                              <>
                                <form
                                  className="w-full max-w-xl bg-gray-900/60 rounded-lg p-4 mt-4 flex flex-col gap-4"
                                  onSubmit={async e => {
                                    e.preventDefault();
                                    const form = e.target;
                                    const mensagem = form.mensagem.value;
                                    let payload = {};
                                    // Priorizar áudio gravado
                                    if (recordedAudio) {
                                      payload = {
                                        messageType: "audioMessage",
                                        base64: await blobToBase64(recordedAudio)
                                      };
                                    } else if (imageFile) {
                                      payload = {
                                        messageType: "imageMessage",
                                        imageMessage: {
                                          jpegThumbnail: await fileToBase64(imageFile)
                                        }
                                      };
                                    } else if (mensagem && mensagem.trim()) {
                                      payload = {
                                        messageType: "text",
                                        mensagem
                                      };
                                    } else {
                                      setAgentError('Envie uma mensagem, áudio ou imagem.');
                                      return;
                                    }
                                    console.log('Payload enviado ao agente:', payload);
                                    await acionarAgenteMax(payload);
                                    // Limpar campos após envio
                                    form.mensagem.value = '';
                                    setImageFile(null);
                                    setRecordedAudio(null);
                                    setAudioUrl(null);
                                  }}
                                >
                                  <label className="text-gray-200 font-medium">Mensagem para o Agente MAX:</label>
                                  <textarea
                                    name="mensagem"
                                    className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/50"
                                    placeholder="Digite sua mensagem para o agente..."
                                    rows={3}
                                    disabled={agentLoading || isRecording}
                                  />
                                  <div className="flex flex-col gap-2">
                                    <label className="text-gray-200 font-medium">Gravar Áudio:</label>
                                    <div className="flex items-center gap-2">
                                      {!isRecording && (
                                        <button type="button" onClick={startRecording} disabled={agentLoading} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">Gravar Áudio</button>
                                      )}
                                      {isRecording && (
                                        <button type="button" onClick={stopRecording} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Parar Gravação</button>
                                      )}
                                      {recordedAudio && audioUrl && (
                                        <audio controls src={audioUrl} className="ml-2" />
                                      )}
                                    </div>
                                  </div>
                                  <label className="text-gray-200 font-medium">Enviar Imagem:</label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setImageFile(e.target.files[0])}
                                    className="text-white"
                                    disabled={agentLoading || isRecording}
                                  />
                                  <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black font-bold rounded-full mt-2"
                                    disabled={agentLoading}
                                  >
                                    {agentLoading ? "Enviando..." : "Testar Mensagem"}
                                  </button>
                                  {agentError && <div className="text-red-500 mt-2">{agentError}</div>}
                                  {agentResponse && (
                                    <div className="bg-gray-800/70 rounded-lg p-4 mt-2 w-full max-w-xl text-left text-xs text-gray-200 overflow-x-auto">
                                      <strong>Resposta do Agente:</strong>
                                      {agentResponse.audio && (
                                        <audio controls src={`data:audio/mp3;base64,${agentResponse.audio}`}></audio>
                                      )}
                                      {agentResponse.imagem && (
                                        <img src={`data:image/jpeg;base64,${agentResponse.imagem}`} alt="Imagem do agente" className="my-2 max-h-48" />
                                      )}
                                      {agentResponse.texto && (
                                        <div className="my-2">{agentResponse.texto}</div>
                                      )}
                                      {/* fallback para mostrar o JSON bruto */}
                                      <pre className="whitespace-pre-wrap break-all">{JSON.stringify(agentResponse, null, 2)}</pre>
                                    </div>
                                  )}
                                </form>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm -z-10" onClick={handleClose}></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
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
                Nossos Agentes <span className="gradient-text">Visionários</span>
              </h1>
              <p className="text-xl text-gray-300">
                Conheça as soluções que estão revolucionando o mercado imobiliário.<br />
                Monitoramento, atendimento, integração e automação — tudo com IA de verdade.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6">
            {/* Filters */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                      filter === category.id 
                        ? "bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black" 
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredAgents.map((agent) => (
                  <motion.div
                    layout
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAgentClick(agent)}
                    className="group cursor-pointer"
                  >
                    <div className="rounded-xl overflow-hidden bg-gradient-to-b from-gray-800/30 to-gray-900/30 border border-gray-800 hover:border-gray-700 transition-all h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={agent.image} 
                          alt={agent.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs rounded-full bg-black/60 text-gray-300 backdrop-blur-md border border-gray-800">
                            {categories.find(c => c.id === agent.category)?.name}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-[#00f0ff] transition-colors">{agent.title}</h3>
                        <p className="text-gray-400 mb-6 flex-grow">{agent.description}</p>
                        <div className="flex items-center text-sm text-[#00f0ff] font-medium">
                          <span>Ver detalhes</span>
                          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
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
                    Não encontrou o que procura?
                  </h2>
                  <p className="text-xl text-gray-300">
                    Vamos criar juntos o próximo agente que vai transformar seu negócio.<br />
                    Fale com a Ugarit e lidere a inovação no seu mercado.
                  </p>
                </div>
                <Link to={createPageUrl("Contact") }>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black font-bold rounded-full whitespace-nowrap flex items-center space-x-2"
                  >
                    <span>Quero um Agente Visionário</span>
                    <Plus className="w-5 h-5" />
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
