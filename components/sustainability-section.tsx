"use client"

import { motion } from "framer-motion"
import { 
  TreePine, 
  Droplets, 
  Recycle, 
  Wind, 
  Sun,
  Leaf,
  Check
} from "lucide-react"

const practices = [
  {
    icon: Droplets,
    title: "Irrigação Inteligente",
    description: "Sistemas de irrigação por gotejamento que economizam até 50% de água.",
    stats: "50% economia",
  },
  {
    icon: Recycle,
    title: "Agricultura Circular",
    description: "Reaproveitamento de resíduos agrícolas como fertilizantes naturais.",
    stats: "Zero desperdício",
  },
  {
    icon: Wind,
    title: "Energia Renovável",
    description: "Painéis solares e turbinas eólicas alimentando fazendas inteligentes.",
    stats: "100% limpa",
  },
  {
    icon: TreePine,
    title: "Preservação Florestal",
    description: "Manutenção de reservas legais e áreas de preservação permanente.",
    stats: "20% preservado",
  },
]

const benefits = [
  "Redução de 30% nas emissões de carbono",
  "Economia de 40% no consumo de água",
  "Aumento de 25% na biodiversidade local",
  "Melhoria da qualidade do solo",
  "Certificações ambientais internacionais",
  "Acesso a mercados premium",
]

export function SustainabilitySection() {
  return (
    <section id="sustentabilidade" className="py-20 lg:py-32 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
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
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Sustentabilidade</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Produzir Mais,
            <span className="block text-primary">Preservando o Planeta</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            O equilíbrio perfeito entre alta produtividade agrícola e responsabilidade ambiental.
            Conheça as práticas sustentáveis que estão transformando o campo paranaense.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Practices Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {practices.map((practice, index) => (
              <motion.div
                key={practice.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-5 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <practice.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {practice.stats}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{practice.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {practice.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl blur-2xl" />
            <div className="relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Benefícios Comprovados</h3>
                  <p className="text-sm text-muted-foreground">
                    Resultados reais da agricultura sustentável
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/50 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Carbon Footprint Indicator */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Pegada de Carbono</span>
                  <span className="text-sm text-primary font-bold">-30%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "70%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Redução alcançada comparado a métodos tradicionais
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
