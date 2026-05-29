"use client"

import { motion } from "framer-motion"
import { 
  Cpu, 
  Satellite, 
  CloudRain, 
  Gauge, 
  Wifi,
  Smartphone,
  Database,
  LineChart
} from "lucide-react"

const technologies = [
  {
    icon: Satellite,
    title: "Monitoramento por Satélite",
    description: "Imagens de satélite em tempo real para análise de safras, detecção de pragas e otimização de plantio.",
  },
  {
    icon: CloudRain,
    title: "Previsão Climática",
    description: "Sistemas avançados de previsão meteorológica para planejamento agrícola preciso.",
  },
  {
    icon: Gauge,
    title: "Sensores IoT",
    description: "Sensores inteligentes que monitoram umidade do solo, temperatura e nutrientes em tempo real.",
  },
  {
    icon: Wifi,
    title: "Conectividade Rural",
    description: "Internet 5G e conexão de banda larga levando tecnologia para áreas remotas do campo.",
  },
  {
    icon: Database,
    title: "Big Data Agrícola",
    description: "Análise de grandes volumes de dados para otimização de processos e aumento da produtividade.",
  },
  {
    icon: Smartphone,
    title: "Apps para Agricultores",
    description: "Aplicativos móveis que conectam produtores a mercados, previsões e assistência técnica.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function TechnologySection() {
  return (
    <section id="tecnologia" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Cpu className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Tecnologia no Campo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Inovação que Transforma
            <span className="block text-primary">o Agronegócio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Conheça as tecnologias de ponta que estão revolucionando a agricultura no Paraná,
            tornando-a mais eficiente, produtiva e sustentável.
          </p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative h-full p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <tech.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {tech.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "85%", label: "Fazendas Conectadas" },
              { value: "R$ 2.5B", label: "Investimento em Tech" },
              { value: "150k+", label: "Sensores Ativos" },
              { value: "99.9%", label: "Uptime dos Sistemas" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
