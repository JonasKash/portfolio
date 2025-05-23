import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, X, Mic, Image } from "lucide-react";

const ChatInterface = ({ 
  agentName = "Agent", 
  agentAvatar = "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
  onClose,
  webhookUrl = "https://n8n.ugaritdigital.com/webhook-test/agente-site-portifolio"
}) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "agent", 
      text: `Hello! I'm ${agentName}. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Convert file to base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Convert blob to base64
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Start audio recording
  const startRecording = async () => {
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
        
        // Auto-send after recording
        handleSendAudio(audioBlob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone permission denied or not supported.");
    }
  };

  // Stop audio recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle image selection
  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  // Handle image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      
      // Auto-send after selecting
      handleSendImage(e.target.files[0]);
    }
  };

  // Send text message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    
    // Show typing indicator
    setIsTyping(true);
    setIsLoading(true);
    
    try {
      const payload = {
        messageType: "text",
        mensagem: inputMessage
      };
      
      const response = await sendToWebhook(payload);
      handleAgentResponse(response);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: "agent",
        text: "Sorry, there was an error processing your message. Please try again.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  // Send audio message
  const handleSendAudio = async (audioBlob) => {
    if (!audioBlob) return;
    
    const newMessage = {
      id: Date.now(),
      sender: "user",
      isAudio: true,
      audioUrl: URL.createObjectURL(audioBlob),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    setIsLoading(true);
    
    try {
      const base64Audio = await blobToBase64(audioBlob);
      
      const payload = {
        messageType: "audioMessage",
        base64: base64Audio
      };
      
      const response = await sendToWebhook(payload);
      handleAgentResponse(response);
    } catch (error) {
      console.error("Error sending audio:", error);
      
      // Add error message
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: "agent",
        text: "Sorry, there was an error processing your audio. Please try again.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
      setRecordedAudio(null);
      setAudioUrl(null);
    }
  };

  // Send image message
  const handleSendImage = async (imageFile) => {
    if (!imageFile) return;
    
    const newMessage = {
      id: Date.now(),
      sender: "user",
      isImage: true,
      imageUrl: URL.createObjectURL(imageFile),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    setIsLoading(true);
    
    try {
      const base64Image = await fileToBase64(imageFile);
      
      const payload = {
        messageType: "imageMessage",
        imageMessage: {
          jpegThumbnail: base64Image
        }
      };
      
      const response = await sendToWebhook(payload);
      handleAgentResponse(response);
    } catch (error) {
      console.error("Error sending image:", error);
      
      // Add error message
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: "agent",
        text: "Sorry, there was an error processing your image. Please try again.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
      setImageFile(null);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Send to webhook
  const sendToWebhook = async (payload) => {
    console.log('[DEBUG] Sending to webhook:', payload);
    
     const res = await fetch(webhookUrl, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(payload)
});
const json = await res.json();
console.log('[DEBUG] Response JSON:', json);
return json;

  };

  // Function to handle agent response
  const handleAgentResponse = (response) => {
    // Simulate typing delay (between 1-2 seconds)
    const typingDelay = Math.floor(Math.random() * 1000) + 1000;
    
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        sender: "agent",
        timestamp: new Date()
      };
      
      // Process response from n8n webhook which comes as an array with reply field
       if (Array.isArray(response) && response.length > 0 && response[0].reply) {
        newMessage.text = response[0].reply;
      } else if (typeof response === 'object' && response !== null && 'reply' in response) {
        newMessage.text = response.reply;
      } else {
        newMessage.text = "Olá, recebi sua mensagem. Como posso te ajudar hoje?";
      }

            setMessages(prev => [...prev, newMessage]);
          }, typingDelay);
        };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00f0ff]">
            <img 
              src={agentAvatar} 
              alt={agentName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-white">{agentName}</h3>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-gray-400">Online</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-black">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black rounded-tr-none' 
                  : message.isError 
                    ? 'bg-red-900/30 border border-red-800 text-white rounded-tl-none'
                    : 'bg-gray-800 text-white rounded-tl-none'
              }`}
            >
              {/* Text Message */}
              {message.text && <p className="mb-1">{message.text}</p>}
              
              {/* Audio Message */}
              {message.isAudio && message.audioUrl && (
                <audio controls src={message.audioUrl} className="max-w-full"></audio>
              )}
              
              {/* Image Message */}
              {message.isImage && message.imageUrl && (
                <img 
                  src={message.imageUrl} 
                  alt="Message with image" 
                  className="max-w-full rounded"
                />
              )}
              
              {/* Timestamp */}
              <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-gray-800' : 'text-gray-400'}`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <div className="p-4 border-t border-gray-800 bg-gradient-to-r from-gray-900 to-black">
        <div className="flex items-center space-x-2">
          {/* Audio Recording Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
            className={`p-2 rounded-full ${
              isRecording 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
          
          {/* Image Upload Button */}
          <button
            onClick={handleImageSelect}
            disabled={isLoading || isRecording}
            className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700"
          >
            <Image className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </button>
          
          {/* Text Input */}
          <div className="flex-grow">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || isRecording}
              placeholder="Type your message..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/50 focus:border-transparent"
            />
          </div>
          
          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || isRecording}
            className={`p-2 rounded-full ${
              !inputMessage.trim() || isLoading || isRecording
                ? 'bg-gray-800 text-gray-500'
                : 'bg-gradient-to-r from-[#00f0ff] to-[#9442fe] text-black'
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
