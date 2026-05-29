"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, User, Leaf, Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "Como posso melhorar a sustentabilidade da minha fazenda?",
  "Quais são as melhores práticas de irrigação?",
  "Como reduzir a emissão de carbono na agricultura?",
  "Quais tecnologias verdes posso implementar?",
]

const aiResponses: Record<string, string> = {
  default: `Olá! Sou o AgroBot, seu assistente de agricultura sustentável. Posso ajudar com:

• Práticas de preservação ambiental
• Técnicas de irrigação eficiente
• Redução de emissões de carbono
• Tecnologias verdes para o campo
• Certificações ambientais

Como posso ajudar você hoje?`,
  sustentabilidade: `Para melhorar a sustentabilidade da sua fazenda, recomendo:

1. **Rotação de Culturas**: Alterne diferentes cultivos para manter a saúde do solo e reduzir pragas.

2. **Integração Lavoura-Pecuária-Floresta (ILPF)**: Combine agricultura, pecuária e árvores na mesma área.

3. **Cobertura do Solo**: Use plantas de cobertura para proteger e enriquecer o solo.

4. **Preservação de APPs**: Mantenha as Áreas de Preservação Permanente e reservas legais.

5. **Monitoramento**: Use sensores IoT para otimizar recursos e reduzir desperdícios.

Quer detalhes sobre alguma dessas práticas?`,
  irrigacao: `As melhores práticas de irrigação incluem:

1. **Gotejamento**: Economia de até 50% de água, aplicação direta na raiz.

2. **Sensores de Umidade**: Irrigue apenas quando necessário, evitando desperdício.

3. **Irrigação Noturna**: Reduz evaporação em até 30%.

4. **Captação de Água da Chuva**: Armazene e reutilize água pluvial.

5. **Fertirrigação**: Combine irrigação com fertilização para máxima eficiência.

O sistema de gotejamento com sensores é o mais recomendado para o clima paranaense!`,
  carbono: `Para reduzir emissões de carbono na agricultura:

1. **Plantio Direto**: Reduz emissões em até 70% comparado ao plantio convencional.

2. **Biocombustíveis**: Utilize biodiesel e etanol nos maquinários.

3. **Energia Solar**: Painéis solares para operações da fazenda.

4. **Compostagem**: Transforme resíduos em fertilizantes naturais.

5. **Reflorestamento**: Plante árvores nativas em áreas degradadas.

6. **Créditos de Carbono**: Participe de programas e gere renda extra!

O Paraná já reduziu 30% das emissões agrícolas com essas práticas.`,
  tecnologias: `Tecnologias verdes para implementar:

1. **Drones Agrícolas**: Monitoramento aéreo e aplicação precisa de insumos.

2. **Agricultura de Precisão**: GPS e sensores para otimização de plantio.

3. **Biodigestores**: Geração de biogás a partir de resíduos orgânicos.

4. **Painéis Solares**: Energia limpa para irrigação e operações.

5. **Apps de Gestão**: Controle digital de produção e sustentabilidade.

6. **Estações Meteorológicas**: Previsão local para decisões mais precisas.

Essas tecnologias podem aumentar a produtividade em até 25%!`,
}

const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes("sustentabilidade") || lowerMessage.includes("melhorar") || lowerMessage.includes("fazenda")) {
    return aiResponses.sustentabilidade
  }
  if (lowerMessage.includes("irrigação") || lowerMessage.includes("água") || lowerMessage.includes("irrigar")) {
    return aiResponses.irrigacao
  }
  if (lowerMessage.includes("carbono") || lowerMessage.includes("emissão") || lowerMessage.includes("co2")) {
    return aiResponses.carbono
  }
  if (lowerMessage.includes("tecnologia") || lowerMessage.includes("verde") || lowerMessage.includes("implementar")) {
    return aiResponses.tecnologias
  }
  
  return aiResponses.default
}

export function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: aiResponses.default,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(messageText),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: aiResponses.default,
        timestamp: new Date(),
      },
    ])
  }

  return (
    <section id="ia" className="py-20 lg:py-32 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">IA Agrícola</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            AgroBot
            <span className="block text-primary">Assistente Inteligente</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Converse com nossa IA especializada em agricultura sustentável.
            Tire dúvidas sobre práticas ambientais, tecnologias verdes e muito mais.
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-card/80 backdrop-blur-sm border border-border overflow-hidden"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
              </div>
              <div>
                <div className="font-semibold">AgroBot</div>
                <div className="text-xs text-muted-foreground">Online - Pronto para ajudar</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleReset}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted rounded-tl-none"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div
                      className={`text-[10px] mt-2 ${
                        message.role === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Perguntas sugeridas</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua pergunta sobre agricultura sustentável..."
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
              />
              <Button type="submit" size="icon" className="h-12 w-12 rounded-xl">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
