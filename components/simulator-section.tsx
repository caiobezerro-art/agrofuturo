"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sprout, 
  CloudRain, 
  Droplets, 
  TreePine,
  Gauge,
  Leaf,
  Wind,
  Sun,
  Calculator,
  RotateCcw
} from "lucide-react"
import { Button } from "@/components/ui/button"

type CropType = "soja" | "milho" | "trigo" | "cafe"
type ClimateType = "tropical" | "subtropical" | "temperado"
type IrrigationType = "gotejamento" | "aspersao" | "inundacao" | "nenhum"
type PreservationType = "alta" | "media" | "baixa"

interface SimulationResult {
  productivity: number
  waterUsage: number
  carbonEmission: number
  environmentalImpact: number
  sustainabilityScore: number
}

const crops: { id: CropType; name: string; icon: typeof Sprout }[] = [
  { id: "soja", name: "Soja", icon: Sprout },
  { id: "milho", name: "Milho", icon: Sprout },
  { id: "trigo", name: "Trigo", icon: Sprout },
  { id: "cafe", name: "Café", icon: Leaf },
]

const climates: { id: ClimateType; name: string; icon: typeof Sun }[] = [
  { id: "tropical", name: "Tropical", icon: Sun },
  { id: "subtropical", name: "Subtropical", icon: CloudRain },
  { id: "temperado", name: "Temperado", icon: Wind },
]

const irrigations: { id: IrrigationType; name: string; efficiency: number }[] = [
  { id: "gotejamento", name: "Gotejamento", efficiency: 95 },
  { id: "aspersao", name: "Aspersão", efficiency: 75 },
  { id: "inundacao", name: "Inundação", efficiency: 50 },
  { id: "nenhum", name: "Sem Irrigação", efficiency: 30 },
]

const preservations: { id: PreservationType; name: string; bonus: number }[] = [
  { id: "alta", name: "Alta (30%+ área)", bonus: 25 },
  { id: "media", name: "Média (20% área)", bonus: 15 },
  { id: "baixa", name: "Baixa (mínimo legal)", bonus: 5 },
]

const calculateSimulation = (
  crop: CropType,
  climate: ClimateType,
  irrigation: IrrigationType,
  preservation: PreservationType
): SimulationResult => {
  const baseProductivity: Record<CropType, number> = {
    soja: 3500,
    milho: 6000,
    trigo: 3000,
    cafe: 2500,
  }

  const climateMultiplier: Record<ClimateType, number> = {
    tropical: 1.1,
    subtropical: 1.0,
    temperado: 0.85,
  }

  const irrigationData = irrigations.find(i => i.id === irrigation)!
  const preservationData = preservations.find(p => p.id === preservation)!

  const productivity = Math.round(
    baseProductivity[crop] * 
    climateMultiplier[climate] * 
    (irrigationData.efficiency / 100) * 
    (1 + preservationData.bonus / 100)
  )

  const baseWater: Record<IrrigationType, number> = {
    gotejamento: 400,
    aspersao: 700,
    inundacao: 1200,
    nenhum: 0,
  }

  const waterUsage = baseWater[irrigation]

  const baseCarbon: Record<CropType, number> = {
    soja: 150,
    milho: 200,
    trigo: 120,
    cafe: 180,
  }

  const carbonReduction = preservation === "alta" ? 0.6 : preservation === "media" ? 0.8 : 1.0
  const carbonEmission = Math.round(baseCarbon[crop] * carbonReduction)

  const environmentalImpact = Math.round(
    100 - (preservationData.bonus * 2) - (irrigationData.efficiency / 5)
  )

  const sustainabilityScore = Math.round(
    (irrigationData.efficiency * 0.3) +
    (preservationData.bonus * 2) +
    ((100 - environmentalImpact) * 0.4)
  )

  return {
    productivity,
    waterUsage,
    carbonEmission,
    environmentalImpact: Math.max(10, environmentalImpact),
    sustainabilityScore: Math.min(100, sustainabilityScore),
  }
}

export function SimulatorSection() {
  const [crop, setCrop] = useState<CropType>("soja")
  const [climate, setClimate] = useState<ClimateType>("subtropical")
  const [irrigation, setIrrigation] = useState<IrrigationType>("gotejamento")
  const [preservation, setPreservation] = useState<PreservationType>("alta")
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    setIsCalculating(true)
    const timer = setTimeout(() => {
      setResult(calculateSimulation(crop, climate, irrigation, preservation))
      setIsCalculating(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [crop, climate, irrigation, preservation])

  const reset = () => {
    setCrop("soja")
    setClimate("subtropical")
    setIrrigation("gotejamento")
    setPreservation("alta")
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <section id="simulador" className="py-20 lg:py-32 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simulador Inteligente</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Simule Sua Produção
            <span className="block text-primary">Sustentável</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Configure os parâmetros da sua fazenda e veja em tempo real o impacto ambiental,
            produtividade e sustentabilidade da sua produção.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Crop Selection */}
            <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                Tipo de Cultivo
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {crops.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCrop(c.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      crop === c.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    <c.icon className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Climate Selection */}
            <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-primary" />
                Clima da Região
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {climates.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setClimate(c.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      climate === c.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    <c.icon className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-xs font-medium">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Irrigation Selection */}
            <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                Sistema de Irrigação
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {irrigations.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => setIrrigation(i.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      irrigation === i.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm font-medium block">{i.name}</span>
                    <span className="text-xs opacity-80">{i.efficiency}% eficiência</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preservation Selection */}
            <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TreePine className="h-5 w-5 text-primary" />
                Preservação Ambiental
              </h3>
              <div className="space-y-3">
                {preservations.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPreservation(p.id)}
                    className={`w-full p-4 rounded-xl border transition-all text-left ${
                      preservation === p.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="text-xs block opacity-80">+{p.bonus}% bônus sustentabilidade</span>
                  </button>
                ))}
              </div>
            </div>

            <Button variant="outline" onClick={reset} className="w-full gap-2">
              <RotateCcw className="h-4 w-4" />
              Resetar Configurações
            </Button>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border">
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                Resultados da Simulação
              </h3>

              <AnimatePresence mode="wait">
                {isCalculating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center py-20"
                  >
                    <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Sustainability Score */}
                    <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Pontuação de Sustentabilidade
                      </div>
                      <div className={`text-5xl font-bold ${getScoreColor(result.sustainabilityScore)}`}>
                        {result.sustainabilityScore}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">de 100 pontos</div>
                      <div className="mt-4 h-3 bg-background rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.sustainabilityScore}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <Sprout className="h-5 w-5 text-chart-1 mb-2" />
                        <div className="text-2xl font-bold">{result.productivity.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">kg/hectare</div>
                      </div>
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <Droplets className="h-5 w-5 text-chart-2 mb-2" />
                        <div className="text-2xl font-bold">{result.waterUsage}</div>
                        <div className="text-sm text-muted-foreground">mm/ano</div>
                      </div>
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <Wind className="h-5 w-5 text-chart-5 mb-2" />
                        <div className="text-2xl font-bold">{result.carbonEmission}</div>
                        <div className="text-sm text-muted-foreground">kg CO₂/ha</div>
                      </div>
                      <div className="p-4 rounded-xl bg-background border border-border">
                        <TreePine className="h-5 w-5 text-chart-1 mb-2" />
                        <div className="text-2xl font-bold">{result.environmentalImpact}%</div>
                        <div className="text-sm text-muted-foreground">impacto ambiental</div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <h4 className="font-medium mb-2 text-primary">Recomendações</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {result.sustainabilityScore < 60 && (
                          <li>• Considere aumentar a área de preservação ambiental</li>
                        )}
                        {irrigation !== "gotejamento" && (
                          <li>• A irrigação por gotejamento economiza mais água</li>
                        )}
                        {preservation !== "alta" && (
                          <li>• Maior preservação traz benefícios de longo prazo</li>
                        )}
                        {result.sustainabilityScore >= 80 && (
                          <li>• Parabéns! Sua configuração é altamente sustentável</li>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
